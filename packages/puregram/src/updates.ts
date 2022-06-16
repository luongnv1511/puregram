import http from 'node:http'

import { inspectable } from 'inspectable'
import {
  NextMiddleware,
  Middleware,
  noopNext,
  compose
} from 'middleware-io'
import { debug } from 'debug'

import * as Contexts from './contexts'

import { Composer } from './common/structures/composer'
import { MediaGroup } from './common/media-group'
import { User } from './common/structures/user'

import { TelegramMessage, TelegramUpdate, TelegramUser } from './generated/telegram-interfaces'
import { GetUpdatesParams } from './generated/methods'

import { Constructor, UpdateName, MessageEventName, MaybeArray, Known } from './types/types'
import { StartPollingOptions } from './types/interfaces'

import { delay, parseRequestJSON, updateDebugFlags } from './utils/helpers'

import { TelegramError } from './errors'
import { Telegram } from './telegram'

type ContextConstructor = Constructor<Contexts.Context>

const $debugger = debug('puregram:updates')

if ($debugger.enabled || debug.enabled('puregram:all')) {
  updateDebugFlags(['puregram:updates:*'])
}

const debug_startPolling = $debugger.extend('startPolling')
const debug_startFetchLoop = $debugger.extend('startFetchLoop')
const debug_fetchUpdates = $debugger.extend('fetchUpdates')
const debug_handleUpdate = $debugger.extend('handleUpdate')
const debug_webhook = $debugger.extend('webhook')
const debug_mediaEvents = $debugger.extend('mediaEvents')

// THIS PART OF FILE IS AUTO-GENERATED!
// SOURCE: scripts/generate-updates
// @autogenerated generate-updates-raw-events start
const rawEvents: [UpdateName, Constructor<Contexts.Context>][] = [
  ['callback_query', Contexts.CallbackQueryContext],
  ['channel_chat_created', Contexts.ChannelChatCreatedContext],
  ['chosen_inline_result', Contexts.ChosenInlineResultContext],
  ['delete_chat_photo', Contexts.DeleteChatPhotoContext],
  ['group_chat_created', Contexts.GroupChatCreatedContext],
  ['inline_query', Contexts.InlineQueryContext],
  ['invoice', Contexts.InvoiceContext],
  ['left_chat_member', Contexts.LeftChatMemberContext],
  ['message', Contexts.MessageContext],
  ['edited_message', Contexts.MessageContext],
  ['channel_post', Contexts.MessageContext],
  ['edited_channel_post', Contexts.MessageContext],
  ['migrate_to_chat_id', Contexts.MigrateToChatIdContext],
  ['migrate_from_chat_id', Contexts.MigrateFromChatIdContext],
  ['new_chat_members', Contexts.NewChatMembersContext],
  ['new_chat_photo', Contexts.NewChatPhotoContext],
  ['new_chat_title', Contexts.NewChatTitleContext],
  ['pinned_message', Contexts.PinnedMessageContext],
  ['poll', Contexts.PollContext],
  ['poll_answer', Contexts.PollAnswerContext],
  ['chat_member', Contexts.ChatMemberContext],
  ['my_chat_member', Contexts.ChatMemberContext],
  ['pre_checkout_query', Contexts.PreCheckoutQueryContext],
  ['shipping_query', Contexts.ShippingQueryContext],
  ['successful_payment', Contexts.SuccessfulPaymentContext],
  ['supergroup_chat_created', Contexts.SupergroupChatCreatedContext],
  ['message_auto_delete_timer_changed', Contexts.MessageAutoDeleteTimerChangedContext],
  ['video_chat_scheduled', Contexts.VideoChatScheduledContext],
  ['video_chat_started', Contexts.VideoChatStartedContext],
  ['video_chat_ended', Contexts.VideoChatEndedContext],
  ['video_chat_participants_invited', Contexts.VideoChatParticipantsInvitedContext],
  ['web_app_data', Contexts.WebAppDataContext],
  ['chat_join_request', Contexts.ChatJoinRequestContext],
  ['proximity_alert_triggered', Contexts.ProximityAlertTriggeredContext]
]
// @autogenerated generate-updates-raw-events end

// @autogenerated generate-updates-contexts-interface start
interface ContextsCollection {
  callback_query: Contexts.CallbackQueryContext
  channel_chat_created: Contexts.ChannelChatCreatedContext
  chosen_inline_result: Contexts.ChosenInlineResultContext
  delete_chat_photo: Contexts.DeleteChatPhotoContext
  group_chat_created: Contexts.GroupChatCreatedContext
  inline_query: Contexts.InlineQueryContext
  invoice: Contexts.InvoiceContext
  left_chat_member: Contexts.LeftChatMemberContext
  message: Contexts.MessageContext
  edited_message: Contexts.MessageContext
  channel_post: Contexts.MessageContext
  edited_channel_post: Contexts.MessageContext
  migrate_to_chat_id: Contexts.MigrateToChatIdContext
  migrate_from_chat_id: Contexts.MigrateFromChatIdContext
  new_chat_members: Contexts.NewChatMembersContext
  new_chat_photo: Contexts.NewChatPhotoContext
  new_chat_title: Contexts.NewChatTitleContext
  pinned_message: Contexts.PinnedMessageContext
  poll: Contexts.PollContext
  poll_answer: Contexts.PollAnswerContext
  chat_member: Contexts.ChatMemberContext
  my_chat_member: Contexts.ChatMemberContext
  pre_checkout_query: Contexts.PreCheckoutQueryContext
  shipping_query: Contexts.ShippingQueryContext
  successful_payment: Contexts.SuccessfulPaymentContext
  supergroup_chat_created: Contexts.SupergroupChatCreatedContext
  message_auto_delete_timer_changed: Contexts.MessageAutoDeleteTimerChangedContext
  video_chat_scheduled: Contexts.VideoChatScheduledContext
  video_chat_started: Contexts.VideoChatStartedContext
  video_chat_ended: Contexts.VideoChatEndedContext
  video_chat_participants_invited: Contexts.VideoChatParticipantsInvitedContext
  web_app_data: Contexts.WebAppDataContext
  chat_join_request: Contexts.ChatJoinRequestContext
  proximity_alert_triggered: Contexts.ProximityAlertTriggeredContext

  [key: string]: Contexts.Context
}
// @autogenerated generate-updates-contexts-interface end

const makeContexts = () => {
  const contexts: Record<string, ContextConstructor> = {}

  for (const [event, UpdateContext] of rawEvents) {
    contexts[event] = UpdateContext
  }

  return contexts
}

const events = makeContexts()

/**
 * Updates class. Anything related to receiving or processing updates belongs to here
 *
 * @example
 * ```js
 * telegram.updates.on('message', context => context.reply('stfu im listening to\n\nlistening to C418 - Sweden'))
 * telegram.updates.startPolling()
 * ```
 */
export class Updates {
  private readonly telegram: Telegram
  private retries: number = 0

  private isStarted: boolean = false
  private offset: number = 0

  private composer: Composer<Contexts.Context> = Composer.builder<Contexts.Context>()
    .caught((_context: Contexts.Context, error: Error) => console.error(error))

  private composed!: Middleware<Contexts.Context>

  constructor(telegram: Telegram) {
    this.telegram = telegram

    this.recompose()
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name
  }

  /**
   * Sets up a middleware that will be called for every single update received
   *
   * @example
   * ```js
   * telegram.updates.use(async (context, next) => {
   *   const start = Date.now()
   * 
   *   await next() // we be waitin' for the middleware chain to execute
   * 
   *   const end = Date.now()
   * 
   *   console.log('damn that update was executing for %dms!', end - start)
   * })
   * ```
   */
  use<T = {}>(middleware: Middleware<Contexts.Context & T>) {
    if (typeof middleware !== 'function') {
      throw new TypeError('middleware must be a function')
    }

    this.composer.use(middleware)
    this.recompose()

    return this
  }


  /**
   * Subscribes to specific event(s) and sets up a handler for it(them)
   *
   * @example
   * ```js
   * telegram.updates.on('message', context => context.reply('im busy stfu'))
   * ```
   */
  on<K extends keyof Known<ContextsCollection>, T = {}>(
    events: MaybeArray<K>,
    handler: MaybeArray<Middleware<ContextsCollection[K] & T>>
  ): this

  on<T = {}>(
    rawOnEvents: MaybeArray<string>,
    rawHandlers: MaybeArray<Middleware<Contexts.Context & T>>
  ) {
    const onEvents = Array.isArray(rawOnEvents)
      ? rawOnEvents
      : [rawOnEvents]

    const hasEvents = onEvents.every(Boolean)

    if (!hasEvents) {
      throw new TypeError('events must be not empty')
    }

    const handler = Array.isArray(rawHandlers)
      ? compose(rawHandlers)
      : rawHandlers

    if (typeof handler !== 'function') {
      throw new TypeError('handler must be a function')
    }

    return this.use(
      (context: Contexts.Context & T, next: NextMiddleware) => (
        context.is(onEvents)
          ? handler(context, next)
          : next()
      )
    )
  }

  /** Calls up the middleware chain */
  dispatchMiddleware(context: Contexts.Context) {
    return this.composed(context, noopNext) as Promise<void>
  }

  private recompose() {
    this.composed = this.composer.compose()
  }

  /**
   * Stops polling bot updates. What did you expect me to write here?
   *
   * @example
   * ```js
   * telegram.updates.startPolling()
   *   .then(() => telegram.updates.stopPolling())
   *   .then(() => console.log(':trollface:'))
   * ```
   */
  stopPolling() {
    this.isStarted = false
    this.retries = 0
  }

  /**
   * Starts polling bot updates
   *
   * @example
   * ```js
   * telegram.updates.startPolling()
   *   .then(() => console.log('started polling updates!'))
   *   .catch(error => console.error('an error has occured! %o', error))
   * ```
   */
  async startPolling(options: StartPollingOptions = {}) {
    if (this.isStarted) {
      throw new Error('polling is already started!')
    }

    if (!this.telegram.options.token) {
      throw new TypeError('token is not set. perhaps you forgot to set it?')
    }

    if (!this.telegram.bot) {
      debug_startPolling('fetching bot data...')

      let me!: TelegramUser

      try {
        me = await this.telegram.api.getMe()
      } catch (error) {
        debug_startPolling('unable to fetch bot info, perhaps no internet connection?')

        throw new TelegramError({
          error_code: -1,
          description: 'unable to fetch bot data from the start',
          cause: error
        })
      }

      const bot: User = new User(me)

      this.telegram.bot = bot

      debug_startPolling('bot data fetched successfully: %O', bot)
    }

    this.isStarted = true

    try {
      this.startFetchLoop(options)
    } catch (error) {
      this.isStarted = false

      throw error
    }

    return true
  }

  /**
   * Drops pending bot updates. Returns amount of dropped updates
   * @param value If you want to skip specific updates, pass an array of update types you want to skip
   *
   * @example
   * ```js
   * const droppedUpdates = await telegram.updates.dropPendingUpdates()
   * console.log('yay! dropped %d updates!', droppedUpdates)
   * 
   * await telegram.updates.startPolling()
   * ```
   */
  async dropPendingUpdates(value?: StartPollingOptions['dropPendingUpdates']) {
    let offset = 0
    let skippedUpdates = 0

    while (true) {
      const allowedUpdates = Array.isArray(value) ? value : []

      const updates = await this.telegram.api.getUpdates({
        offset,
        allowed_updates: allowedUpdates
      })

      if (updates.length === 0) {
        break
      }

      skippedUpdates += updates.length

      offset = updates[updates.length - 1].update_id + 1
    }

    if (skippedUpdates !== 0) {
      debug_startFetchLoop('skipped %d updates', skippedUpdates)
    }

    return skippedUpdates
  }

  private async startFetchLoop(options: StartPollingOptions) {
    try {
      if (options.dropPendingUpdates) {
        await this.dropPendingUpdates(options.dropPendingUpdates)
      }

      while (this.isStarted) {
        await this.fetchUpdates(options)
      }
    } catch (error) {
      debug_startFetchLoop('an error has occured: %O', error)

      if (this.telegram.options.apiRetryLimit === -1) {
        debug_startFetchLoop('trying to reconnect...')
      } else if (this.retries === this.telegram.options.apiRetryLimit) {
        if (this.telegram.options.apiRetryLimit === 0) {
          return debug_startFetchLoop('`apiRetryLimit` is set to %d, not trying to reconnect', 0)
        }

        return debug_startFetchLoop('tried to reconnect %d times but it didn\'t work, cya next time', this.retries)
      } else {
        this.retries += 1

        debug_startFetchLoop('trying to reconnect, %d/%d try', this.retries, this.telegram.options.apiRetryLimit)
      }

      await delay(this.telegram.options.apiWait!)

      // INFO: not this.stopPolling() because it resets this.retries
      this.isStarted = false

      this.startPolling()
    }
  }

  private async fetchUpdates(options: StartPollingOptions) {
    const params: Partial<GetUpdatesParams> = {
      timeout: 15,
      allowed_updates: options.allowedUpdates ?? this.telegram.options.allowedUpdates!
    }

    if (this.offset) params.offset = this.offset
    if (options.offset) params.offset = options.offset
    if (options.timeout) params.timeout = options.timeout

    let updates = await this.telegram.api.getUpdates(params)

    if (!updates) {
      // INFO: something is wrong with the internet connection I can feel it...

      debug_fetchUpdates('unable to get updates')

      this.stopPolling()
      this.startPolling()

      return
    }

    if (!updates.length) {
      return
    }

    // INFO: optimize?
    if (this.telegram.options.mergeMediaEvents) {
      const possibleUpdateTypes = ['message', 'edited_message', 'channel_post', 'edited_channel_post']

      const getMessage = (update: TelegramUpdate) => {
        const key = possibleUpdateTypes.find(ut => update[ut])!
        const message = update[key] as TelegramMessage

        return message
      }

      const mediaEventUpdates = updates
        .filter(update => possibleUpdateTypes.some(ut => update[ut] !== undefined))
        .filter(update => getMessage(update).media_group_id !== undefined)

      if (mediaEventUpdates.length !== 0) {
        const mediaGroupIdsMap = new Map<string, TelegramUpdate[]>()

        const mediaGroupIds = [...new Set(mediaEventUpdates.map(me => getMessage(me).media_group_id!))]

        for (const meId of mediaGroupIds) {
          const updates = mediaEventUpdates.filter(me => getMessage(me).media_group_id! === meId)

          mediaGroupIdsMap.set(meId, updates)
        }

        debug_mediaEvents('MG map: %O', mediaGroupIdsMap)

        for (const [mgId, mgUpdates] of mediaGroupIdsMap.entries()) {
          const contexts = await Promise.all(mgUpdates.map(mgu => this.handleUpdate(mgu, false))) as Contexts.MessageContext[]

          const mediaGroup = new MediaGroup({ id: mgId, contexts })

          // INFO: creating [MediaGroup] on top of the first context
          const context = contexts[0].clone()
          context.mediaGroup = mediaGroup

          this.dispatchMiddleware(context)
        }

        // INFO: clearing out original [updates]
        updates = updates.filter(update => !mediaGroupIdsMap.has(getMessage(update).media_group_id!))
      }
    }

    debug_fetchUpdates('updates: %O', updates)

    for (const update of updates) {
      try {
        await this.handleUpdate(update)
      } catch (error) {
        debug_fetchUpdates('an error has occured: %O', error)
      }
    }
  }

  /**
   * Handles specified update and returns an appropriate `Context` (if it does exist)
   * 
   * If you don't want puregram to automatically process (dispatch) that context, pass `false` for the second argument
   *
   * @example
   * ```js
   * const [update] = await telegram.api.getUpdates(params)
   * const context = await telegram.updates.handleUpdate(update, false)
   * 
   * if (context === undefined) {
   *   console.log(':sadface: context not found for this update!')
   * 
   *   return cry()
   * }
   * 
   * console.log('hell yeah im pro')
   * ```
   */
  async handleUpdate(update: TelegramUpdate, dispatch: boolean = true): Promise<Contexts.Context | undefined> {
    this.offset = update.update_id + 1

    const type = (Object.keys(update) as UpdateName[])[1]

    let UpdateContext = events[type]

    if (!UpdateContext) {
      debug_handleUpdate('unsupported context type `%s`', type)

      return
    }

    debug_handleUpdate('update payload: %j', update[type])

    interface ContextAddition {
      isEvent?: boolean
      eventType?: MessageEventName
    }

    let context: Contexts.Context & ContextAddition = new UpdateContext({
      update,
      type,
      updateId: update.update_id,
      telegram: this.telegram,
      payload: update[type]
    })

    const isEvent = context.isEvent === true && context.eventType !== undefined

    if (isEvent) {
      UpdateContext = events[context.eventType!]

      context = new UpdateContext({
        update,
        updateId: update.update_id,
        type: context.eventType!,
        telegram: this.telegram,
        payload: update.message
      })
    }

    debug_handleUpdate('constructed context: %O', context)

    // INFO: this sends the built context to the middleware chain
    if (dispatch) {
      this.dispatchMiddleware(context)
    }

    return context
  }

  // FIXME: unacceptable return type
  getKoaMiddleware(): Function {
    return async (context: any) => {
      const update = context.request.body

      if (update === undefined) {
        context.status = 500

        throw new Error('request.body is undefined. are you sure you parsed it (e.g. via koa-body)?')
      }

      context.status = 200
      context.set('connection', 'keep-alive')

      setImmediate(() => this.handleUpdate(update))
    }
  }

  // FIXME: unacceptable return type
  getWebhookMiddleware(): (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void> {
    return async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method !== 'POST') {
        return
      }

      const reqBody = (req as typeof req & { body: string | Record<string, any> }).body

      let update: any

      try {
        update = typeof reqBody === 'object' ? reqBody : await parseRequestJSON(req)
      } catch (error) {
        debug_webhook('an error has occured: %O', error)

        return
      }

      if (update === undefined) {
        res.writeHead(500)
        res.end()

        throw new Error('req.body is undefined. are you sure you parsed it (e.g. via body-parser)?')
      }

      res.writeHead(200)
      res.end()

      setImmediate(() => this.handleUpdate(update))
    }
  }
}

inspectable(Updates, {
  serialize(updates) {
    return {}
  }
})
