import { inspectable } from 'inspectable'

import { TelegramUpdate } from '../../telegram-interfaces'

import {
  Message,
  InlineQuery,
  ChosenInlineResult,
  CallbackQuery,
  ShippingQuery,
  PreCheckoutQuery
} from '../../updates/'

import { filterPayload } from '../../utils/helpers'

import { Poll } from './poll'
import { PollAnswer } from './poll-answer'

/**
 * This object represents an incoming update.
 *
 * At most **one** of the optional parameters can be present in any given
 * update.
 */
export class Update {
  constructor(private payload: TelegramUpdate) { }

  get [Symbol.toStringTag](): string {
    return this.constructor.name
  }

  /**
   * The update's unique identifier.
   * Update identifiers start from a certain positive number and increase
   * sequentially. This ID becomes especially handy if you're using
   * **Webhooks**, since it allows you to ignore repeated updates or to restore
   * the correct update sequence, should they get out of order. If there are no
   * new updates for at least a week, then identifier of the next update will
   * be chosen randomly instead of sequentially.
   */
  get id(): number {
    return this.payload.update_id
  }

  /**
   * New incoming message of any kind — text, photo, sticker, etc.
   */
  get message(): Message | undefined {
    const { message } = this.payload

    if (!message) {
      return
    }

    return new Message(message)
  }

  /** New version of a message that is known to the bot and was edited */
  get editedMessage(): Message | undefined {
    const { edited_message } = this.payload

    if (!edited_message) {
      return
    }

    return new Message(edited_message)
  }

  /** New incoming channel post of any kind — text, photo, sticker, etc. */
  get channelPost(): Message | undefined {
    const { channel_post } = this.payload

    if (!channel_post) {
      return
    }

    return new Message(channel_post)
  }

  /** New version of a channel post that is known to the bot and was edited */
  get editedChannelPost(): Message | undefined {
    const { edited_channel_post } = this.payload

    if (!edited_channel_post) {
      return
    }

    return new Message(edited_channel_post)
  }

  /** New incoming inline query */
  get inlineQuery(): InlineQuery | undefined {
    const { inline_query } = this.payload

    if (!inline_query) {
      return
    }

    return new InlineQuery(inline_query)
  }

  /**
   * The result of an inline query that was chosen by a user and sent to their
   * chat partner. Please see our documentation on the feedback collecting for
   * details on how to enable these updates for your bot.
   */
  get chosenInlineResult(): ChosenInlineResult | undefined {
    const { chosen_inline_result } = this.payload

    if (!chosen_inline_result) {
      return
    }

    return new ChosenInlineResult(chosen_inline_result)
  }

  /** New incoming callback query */
  get callbackQuery(): CallbackQuery | undefined {
    const { callback_query } = this.payload

    if (!callback_query) {
      return
    }

    return new CallbackQuery(callback_query)
  }

  /** New incoming shipping query. Only for invoices with flexible price */
  get shippingQuery(): ShippingQuery | undefined {
    const { shipping_query } = this.payload

    if (!shipping_query) {
      return
    }

    return new ShippingQuery(shipping_query)
  }

  /**
   * New incoming pre-checkout query. Contains full information about checkout
   */
  get preCheckoutQuery(): PreCheckoutQuery | undefined {
    const { pre_checkout_query } = this.payload

    if (!pre_checkout_query) {
      return
    }

    return new PreCheckoutQuery(pre_checkout_query)
  }

  /**
   * New poll state. Bots receive only updates about stopped polls and polls,
   * which are sent by the bot
   */
  get poll(): Poll | undefined {
    const { poll } = this.payload

    if (!poll) {
      return
    }

    return new Poll(poll)
  }

  /**
   * A user changed their answer in a non-anonymous poll. Bots receive new
   * votes only in polls that were sent by the bot itself.
   */
  get pollAnswer(): PollAnswer | undefined {
    const { poll_answer } = this.payload

    if (!poll_answer) {
      return
    }

    return new PollAnswer(poll_answer)
  }
}

inspectable(Update, {
  serialize(update: Update) {
    const payload = {
      id: update.id,
      message: update.message,
      editedMessage: update.editedMessage,
      channelPost: update.channelPost,
      editedChannelPost: update.editedChannelPost,
      inlineQuery: update.inlineQuery,
      chosenInlineResult: update.chosenInlineResult,
      callbackQuery: update.callbackQuery,
      shippingQuery: update.shippingQuery,
      preCheckoutQuery: update.preCheckoutQuery,
      poll: update.poll,
      pollAnswer: update.pollAnswer
    }

    return filterPayload(payload)
  }
})
