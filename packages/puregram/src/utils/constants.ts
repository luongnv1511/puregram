import { Agent } from 'undici'

import { TelegramOptions } from '../types/interfaces'
import { Message } from '../updates/'

import { MessageEventName } from '../types/types'

// @ts-expect-error JSON non-resolvable
import { version } from '../../package.json'

export const DEFAULT_OPTIONS: TelegramOptions = {
  token: undefined,
  agent: new Agent({
    keepAliveTimeout: 30_000
  }),
  allowedUpdates: [],

  apiWait: 3000,
  apiBaseUrl: 'https://api.telegram.org/bot',
  apiRetryLimit: -1,
  apiTimeout: 30000,
  apiHeaders: {
    connection: 'keep-alive',
    'User-Agent': `puregram/${version} (+https://github.com/nitreojs/puregram)`
  },

  useTestDc: false,
  mergeMediaEvents: false
}

// THIS PART OF FILE IS AUTO-GENERATED!
// SOURCE: scripts/generate-constants
// @autogenerated generate-constants-events start
export const EVENTS: [keyof Message, MessageEventName][] = [
  ['newChatMembers', 'new_chat_members'],
  ['leftChatMember', 'left_chat_member'],
  ['newChatTitle', 'new_chat_title'],
  ['newChatPhoto', 'new_chat_photo'],
  ['deleteChatPhoto', 'delete_chat_photo'],
  ['groupChatCreated', 'group_chat_created'],
  ['supergroupChatCreated', 'supergroup_chat_created'],
  ['messageAutoDeleteTimerChanged', 'message_auto_delete_timer_changed'],
  ['channelChatCreated', 'channel_chat_created'],
  ['migrateToChatId', 'migrate_to_chat_id'],
  ['migrateFromChatId', 'migrate_from_chat_id'],
  ['pinnedMessage', 'pinned_message'],
  ['invoice', 'invoice'],
  ['successfulPayment', 'successful_payment'],
  ['proximityAlertTriggered', 'proximity_alert_triggered'],
  ['videoChatScheduled', 'video_chat_scheduled'],
  ['videoChatStarted', 'video_chat_started'],
  ['videoChatEnded', 'video_chat_ended'],
  ['videoChatParticipantsInvited', 'video_chat_participants_invited'],
  ['webAppData', 'web_app_data'],
  ['location', 'location'],
  ['passportData', 'passport_data']
]
// @autogenerated generate-constants-events end

export const SERVICE_MESSAGE_EVENTS: MessageEventName[] = [
  'new_chat_members', 'left_chat_member',
  'new_chat_title', 'new_chat_photo',
  'delete_chat_photo', 'group_chat_created',
  'supergroup_chat_created', 'channel_chat_created',
  'message_auto_delete_timer_changed',
  'migrate_from_chat_id', 'migrate_to_chat_id',
  'pinned_message', 'successful_payment',
  'proximity_alert_triggered',
  'video_chat_scheduled', 'video_chat_started',
  'video_chat_ended', 'video_chat_participants_invited',
  'web_app_data'
  // passport_data?
]

export const METHODS_WITH_MEDIA: [string, string[]][] = [
  ['sendPhoto', ['photo']],
  ['sendAudio', ['audio', 'thumb']],
  ['sendDocument', ['document', 'thumb']],
  ['sendVideo', ['video', 'thumb']],
  ['sendAnimation', ['animation', 'thumb']],
  ['sendVideoNote', ['video_note', 'thumb']],
  ['sendMediaGroup', ['media']], // INFO: needs special logic because of 'attach://<attachname>' stuff
  ['sendSticker', ['sticker']],
  ['uploadStickerFile', ['png_sticker']],
  ['createNewStickerSet', ['png_sticker', 'tgs_sticker', 'webm_sticker']],
  ['addStickerToSet', ['png_sticker', 'tgs_sticker', 'webm_sticker']],
  ['setStickerSetThumb', ['thumb']],
  ['editMessageMedia', ['media']],
  ['setWebhook', ['certificate']],
  ['setChatPhoto', ['photo']]
]
