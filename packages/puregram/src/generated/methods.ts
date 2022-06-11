/// AUTO-GENERATED FILE
/// DO NOT EDIT MANUALLY
///
/// This file was auto-generated using https://github.com/ark0f/tg-bot-api
/// Based on Bot API v6.0.0, 16.04.2022
/// Generation date: 11.06.2022 16:25:26 MSK

import * as Interfaces from './telegram-interfaces'

import { SoftString } from '../types/types'

import { MediaInput } from '../common/media-source'
import { MessageEntity } from '../common/structures'

export interface GetUpdatesParams {
  /**
   * Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as [getUpdates](https://core.telegram.org/bots/api/#getupdates) is called with an *offset* higher than its *update\_id*. The negative offset can be specified to retrieve updates starting from *-offset* update from the end of the updates queue. All previous updates will forgotten.
   */
  offset?: number
  /**
   * Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   */
  limit?: number
  /**
   * Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
   */
  timeout?: number
  /**
   * A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited\_channel\_post”, “callback\_query”] to only receive updates of these types. See [Update](https://core.telegram.org/bots/api/#update) for a complete list of available update types. Specify an empty list to receive all update types except *chat\_member* (default). If not specified, the previous setting will be used.  
   * 
   * Please note that this parameter doesn't affect updates created before the call to the getUpdates, so unwanted updates may be received for a short period of time.
   */
  allowed_updates?: string[]

  [key: string]: any
}

/**
 * Use this method to receive incoming updates using long polling ([wiki](https://en.wikipedia.org/wiki/Push_technology#Long_polling)). An Array of [Update](https://core.telegram.org/bots/api/#update) objects is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getupdates)
 */
export type getUpdates = (params?: GetUpdatesParams) => Promise<Interfaces.TelegramUpdate[]>

export interface SetWebhookParams {
  /**
   * HTTPS url to send updates to. Use an empty string to remove webhook integration
   */
  url: string
  /**
   * Upload your public key certificate so that the root certificate in use can be checked. See our [self-signed guide](https://core.telegram.org/bots/self-signed) for details.
   */
  certificate?: MediaInput
  /**
   * The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS
   */
  ip_address?: string
  /**
   * Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to *40*. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput.
   */
  max_connections?: number
  /**
   * A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited\_channel\_post”, “callback\_query”] to only receive updates of these types. See [Update](https://core.telegram.org/bots/api/#update) for a complete list of available update types. Specify an empty list to receive all update types except *chat\_member* (default). If not specified, the previous setting will be used.  
   * Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time.
   */
  allowed_updates?: string[]
  /**
   * Pass *True* to drop all pending updates
   */
  drop_pending_updates?: boolean

  [key: string]: any
}

/**
 * Use this method to specify a url and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified url, containing a JSON-serialized [Update](https://core.telegram.org/bots/api/#update). In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns *True* on success.
 * 
 * If you'd like to make sure that the Webhook request comes from Telegram, we recommend using a secret path in the URL, e.g. `https://www.example.com/<token>`. Since nobody else knows your bot's token, you can be pretty sure it's us.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setwebhook)
 */
export type setWebhook = (params: SetWebhookParams) => Promise<true>

export interface DeleteWebhookParams {
  /**
   * Pass *True* to drop all pending updates
   */
  drop_pending_updates?: boolean

  [key: string]: any
}

/**
 * Use this method to remove webhook integration if you decide to switch back to [getUpdates](https://core.telegram.org/bots/api/#getupdates). Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#deletewebhook)
 */
export type deleteWebhook = (params?: DeleteWebhookParams) => Promise<true>

/**
 * Use this method to get current webhook status. Requires no parameters. On success, returns a [WebhookInfo](https://core.telegram.org/bots/api/#webhookinfo) object. If the bot is using [getUpdates](https://core.telegram.org/bots/api/#getupdates), will return an object with the *url* field empty.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getwebhookinfo)
 */
export type getWebhookInfo = () => Promise<Interfaces.TelegramWebhookInfo>

/**
 * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a [User](https://core.telegram.org/bots/api/#user) object.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getme)
 */
export type getMe = () => Promise<Interfaces.TelegramUser>

/**
 * Use this method to log out from the cloud Bot API server before launching the bot locally. You **must** log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns *True* on success. Requires no parameters.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#logout)
 */
export type logOut = () => Promise<true>

/**
 * Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns *True* on success. Requires no parameters.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#close)
 */
export type close = () => Promise<true>

export interface SendMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Text of the message to be sent, 1-4096 characters after entities parsing
   */
  text: string
  /**
   * Mode for parsing entities in the message text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified instead of *parse\_mode*
   */
  entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_preview?: boolean
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send text messages. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendmessage)
 */
export type sendMessage = (params: SendMessageParams) => Promise<Interfaces.TelegramMessage>

export interface ForwardMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`)
   */
  from_chat_id: number | string
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the forwarded message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * Message identifier in the chat specified in *from\_chat\_id*
   */
  message_id: number

  [key: string]: any
}

/**
 * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#forwardmessage)
 */
export type forwardMessage = (params: ForwardMessageParams) => Promise<Interfaces.TelegramMessage>

export interface CopyMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`)
   */
  from_chat_id: number | string
  /**
   * Message identifier in the chat specified in *from\_chat\_id*
   */
  message_id: number
  /**
   * New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept
   */
  caption?: string
  /**
   * Mode for parsing entities in the new caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. The method is analogous to the method [forwardMessage](https://core.telegram.org/bots/api/#forwardmessage), but the copied message doesn't have a link to the original message. Returns the [MessageId](https://core.telegram.org/bots/api/#messageid) of the sent message on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#copymessage)
 */
export type copyMessage = (params: CopyMessageParams) => Promise<Interfaces.TelegramMessageId>

export interface SendPhotoParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Photo to send. Pass a file\_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  photo: MediaInput
  /**
   * Photo caption (may also be used when resending photos by *file\_id*), 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the photo caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send photos. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendphoto)
 */
export type sendPhoto = (params: SendPhotoParams) => Promise<Interfaces.TelegramMessage>

export interface SendAudioParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Audio file to send. Pass a file\_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  audio: MediaInput
  /**
   * Audio caption, 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the audio caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Duration of the audio in seconds
   */
  duration?: number
  /**
   * Performer
   */
  performer?: string
  /**
   * Track name
   */
  title?: string
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  thumb?: MediaInput
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
 * 
 * For sending voice messages, use the [sendVoice](https://core.telegram.org/bots/api/#sendvoice) method instead.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendaudio)
 */
export type sendAudio = (params: SendAudioParams) => Promise<Interfaces.TelegramMessage>

export interface SendDocumentParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * File to send. Pass a file\_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  document: MediaInput
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  thumb?: MediaInput
  /**
   * Document caption (may also be used when resending documents by *file\_id*), 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the document caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Disables automatic server-side content type detection for files uploaded using multipart/form-data
   */
  disable_content_type_detection?: boolean
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send general files. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#senddocument)
 */
export type sendDocument = (params: SendDocumentParams) => Promise<Interfaces.TelegramMessage>

export interface SendVideoParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Video to send. Pass a file\_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  video: MediaInput
  /**
   * Duration of sent video in seconds
   */
  duration?: number
  /**
   * Video width
   */
  width?: number
  /**
   * Video height
   */
  height?: number
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  thumb?: MediaInput
  /**
   * Video caption (may also be used when resending videos by *file\_id*), 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the video caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Pass *True*, if the uploaded video is suitable for streaming
   */
  supports_streaming?: boolean
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as [Document](https://core.telegram.org/bots/api/#document)). On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendvideo)
 */
export type sendVideo = (params: SendVideoParams) => Promise<Interfaces.TelegramMessage>

export interface SendAnimationParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Animation to send. Pass a file\_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  animation: MediaInput
  /**
   * Duration of sent animation in seconds
   */
  duration?: number
  /**
   * Animation width
   */
  width?: number
  /**
   * Animation height
   */
  height?: number
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  thumb?: MediaInput
  /**
   * Animation caption (may also be used when resending animation by *file\_id*), 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the animation caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendanimation)
 */
export type sendAnimation = (params: SendAnimationParams) => Promise<Interfaces.TelegramMessage>

export interface SendVoiceParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Audio file to send. Pass a file\_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  voice: MediaInput
  /**
   * Voice message caption, 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the voice message caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Duration of the voice message in seconds
   */
  duration?: number
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as [Audio](https://core.telegram.org/bots/api/#audio) or [Document](https://core.telegram.org/bots/api/#document)). On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendvoice)
 */
export type sendVoice = (params: SendVoiceParams) => Promise<Interfaces.TelegramMessage>

export interface SendVideoNoteParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Video note to send. Pass a file\_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files). Sending video notes by a URL is currently unsupported
   */
  video_note: MediaInput
  /**
   * Duration of sent video in seconds
   */
  duration?: number
  /**
   * Video width and height, i.e. diameter of the video message
   */
  length?: number
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  thumb?: MediaInput
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * As of [v.4.0](https://telegram.org/blog/video-messages-and-telescope), Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendvideonote)
 */
export type sendVideoNote = (params: SendVideoNoteParams) => Promise<Interfaces.TelegramMessage>

export interface SendMediaGroupParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * A JSON-serialized array describing messages to be sent, must include 2-10 items
   */
  media: (Interfaces.TelegramInputMediaAudio | Interfaces.TelegramInputMediaDocument | Interfaces.TelegramInputMediaPhoto | Interfaces.TelegramInputMediaVideo)[]
  /**
   * Sends messages [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent messages from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean

  [key: string]: any
}

/**
 * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of [Messages](https://core.telegram.org/bots/api/#message) that were sent is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendmediagroup)
 */
export type sendMediaGroup = (params: SendMediaGroupParams) => Promise<Interfaces.TelegramMessage[]>

export interface SendLocationParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Latitude of the location
   */
  latitude: number
  /**
   * Longitude of the location
   */
  longitude: number
  /**
   * The radius of uncertainty for the location, measured in meters; 0-1500
   */
  horizontal_accuracy?: number
  /**
   * Period in seconds for which the location will be updated (see [Live Locations](https://telegram.org/blog/live-locations), should be between 60 and 86400.
   */
  live_period?: number
  /**
   * For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
   */
  heading?: number
  /**
   * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
   */
  proximity_alert_radius?: number
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send point on the map. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendlocation)
 */
export type sendLocation = (params: SendLocationParams) => Promise<Interfaces.TelegramMessage>

export interface EditMessageLiveLocationParams {
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string
  /**
   * Latitude of new location
   */
  latitude: number
  /**
   * Longitude of new location
   */
  longitude: number
  /**
   * The radius of uncertainty for the location, measured in meters; 0-1500
   */
  horizontal_accuracy?: number
  /**
   * Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
   */
  heading?: number
  /**
   * Maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
   */
  proximity_alert_radius?: number
  /**
   * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to edit live location messages. A location can be edited until its *live\_period* expires or editing is explicitly disabled by a call to [stopMessageLiveLocation](https://core.telegram.org/bots/api/#stopmessagelivelocation). On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#editmessagelivelocation)
 */
export type editMessageLiveLocation = (params: EditMessageLiveLocationParams) => Promise<Interfaces.TelegramMessage | true>

export interface StopMessageLiveLocationParams {
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the message with live location to stop
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string
  /**
   * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to stop updating a live location message before *live\_period* expires. On success, if the message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#stopmessagelivelocation)
 */
export type stopMessageLiveLocation = (params?: StopMessageLiveLocationParams) => Promise<Interfaces.TelegramMessage | true>

export interface SendVenueParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Latitude of the venue
   */
  latitude: number
  /**
   * Longitude of the venue
   */
  longitude: number
  /**
   * Name of the venue
   */
  title: string
  /**
   * Address of the venue
   */
  address: string
  /**
   * Foursquare identifier of the venue
   */
  foursquare_id?: string
  /**
   * Foursquare type of the venue, if known. (For example, “arts\_entertainment/default”, “arts\_entertainment/aquarium” or “food/icecream”.)
   */
  foursquare_type?: string
  /**
   * Google Places identifier of the venue
   */
  google_place_id?: string
  /**
   * Google Places type of the venue. (See [supported types](https://developers.google.com/places/web-service/supported_types).)
   */
  google_place_type?: string
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send information about a venue. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendvenue)
 */
export type sendVenue = (params: SendVenueParams) => Promise<Interfaces.TelegramMessage>

export interface SendContactParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Contact's phone number
   */
  phone_number: string
  /**
   * Contact's first name
   */
  first_name: string
  /**
   * Contact's last name
   */
  last_name?: string
  /**
   * Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes
   */
  vcard?: string
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send phone contacts. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendcontact)
 */
export type sendContact = (params: SendContactParams) => Promise<Interfaces.TelegramMessage>

export type SendPollType = 'quiz' | 'regular'

export interface SendPollParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Poll question, 1-300 characters
   */
  question: string
  /**
   * A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   */
  options: string[]
  /**
   * *True*, if the poll needs to be anonymous, defaults to *True*
   */
  is_anonymous?: boolean
  /**
   * Poll type, “quiz” or “regular”, defaults to “regular”
   */
  type?: SoftString<SendPollType>
  /**
   * *True*, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to *False*
   */
  allows_multiple_answers?: boolean
  /**
   * 0-based identifier of the correct answer option, required for polls in quiz mode
   */
  correct_option_id?: number
  /**
   * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing
   */
  explanation?: string
  /**
   * Mode for parsing entities in the explanation. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  explanation_parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the poll explanation, which can be specified instead of *parse\_mode*
   */
  explanation_entities?: Interfaces.TelegramMessageEntity[]
  /**
   * Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with *close\_date*.
   */
  open_period?: number
  /**
   * Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with *open\_period*.
   */
  close_date?: number
  /**
   * Pass *True*, if the poll needs to be immediately closed. This can be useful for poll preview.
   */
  is_closed?: boolean
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send a native poll. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendpoll)
 */
export type sendPoll = (params: SendPollParams) => Promise<Interfaces.TelegramMessage>

export type SendDiceEmoji = '🎲' | '🎯' | '🏀' | '⚽' | '🎳' | '🎰'

export interface SendDiceParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, “🎳”, or “🎰”. Dice can have values 1-6 for “🎲”, “🎯” and “🎳”, values 1-5 for “🏀” and “⚽”, and values 1-64 for “🎰”. Defaults to “🎲”
   */
  emoji?: SoftString<SendDiceEmoji>
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send an animated emoji that will display a random value. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#senddice)
 */
export type sendDice = (params: SendDiceParams) => Promise<Interfaces.TelegramMessage>

export type SendChatActionAction = 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_voice' | 'upload_voice' | 'upload_document' | 'choose_sticker' | 'find_location' | 'record_video_note' | 'upload_video_note'

export interface SendChatActionParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Type of action to broadcast. Choose one, depending on what the user is about to receive: *typing* for [text messages](https://core.telegram.org/bots/api/#sendmessage), *upload\_photo* for [photos](https://core.telegram.org/bots/api/#sendphoto), *record\_video* or *upload\_video* for [videos](https://core.telegram.org/bots/api/#sendvideo), *record\_voice* or *upload\_voice* for [voice notes](https://core.telegram.org/bots/api/#sendvoice), *upload\_document* for [general files](https://core.telegram.org/bots/api/#senddocument), *choose\_sticker* for [stickers](https://core.telegram.org/bots/api/#sendsticker), *find\_location* for [location data](https://core.telegram.org/bots/api/#sendlocation), *record\_video\_note* or *upload\_video\_note* for [video notes](https://core.telegram.org/bots/api/#sendvideonote).
   */
  action: SoftString<SendChatActionAction>

  [key: string]: any
}

/**
 * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns *True* on success.
 * 
 * Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use [sendChatAction](https://core.telegram.org/bots/api/#sendchataction) with *action* = *upload\_photo*. The user will see a “sending photo” status for the bot.
 * 
 * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to arrive.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendchataction)
 */
export type sendChatAction = (params: SendChatActionParams) => Promise<true>

export interface GetUserProfilePhotosParams {
  /**
   * Unique identifier of the target user
   */
  user_id: number
  /**
   * Sequential number of the first photo to be returned. By default, all photos are returned.
   */
  offset?: number
  /**
   * Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   */
  limit?: number

  [key: string]: any
}

/**
 * Use this method to get a list of profile pictures for a user. Returns a [UserProfilePhotos](https://core.telegram.org/bots/api/#userprofilephotos) object.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getuserprofilephotos)
 */
export type getUserProfilePhotos = (params: GetUserProfilePhotosParams) => Promise<Interfaces.TelegramUserProfilePhotos>

export interface GetFileParams {
  /**
   * File identifier to get info about
   */
  file_id: string

  [key: string]: any
}

/**
 * Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a [File](https://core.telegram.org/bots/api/#file) object is returned. The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling [getFile](https://core.telegram.org/bots/api/#getfile) again.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getfile)
 */
export type getFile = (params: GetFileParams) => Promise<Interfaces.TelegramFile>

export interface BanChatMemberParams {
  /**
   * Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number
  /**
   * Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only.
   */
  until_date?: number
  /**
   * Pass *True* to delete all messages from the chat for the user that is being removed. If *False*, the user will be able to see messages in the group that were sent before the user was removed. Always *True* for supergroups and channels.
   */
  revoke_messages?: boolean

  [key: string]: any
}

/**
 * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless [unbanned](https://core.telegram.org/bots/api/#unbanchatmember) first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#banchatmember)
 */
export type banChatMember = (params: BanChatMemberParams) => Promise<true>

export interface UnbanChatMemberParams {
  /**
   * Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number
  /**
   * Do nothing if the user is not banned
   */
  only_if_banned?: boolean

  [key: string]: any
}

/**
 * Use this method to unban a previously banned user in a supergroup or channel. The user will **not** return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat. If you don't want this, use the parameter *only\_if\_banned*. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#unbanchatmember)
 */
export type unbanChatMember = (params: UnbanChatMemberParams) => Promise<true>

export interface RestrictChatMemberParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number
  /**
   * A JSON-serialized object for new user permissions
   */
  permissions: Interfaces.TelegramChatPermissions
  /**
   * Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever
   */
  until_date?: number

  [key: string]: any
}

/**
 * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass *True* for all permissions to lift restrictions from a user. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#restrictchatmember)
 */
export type restrictChatMember = (params: RestrictChatMemberParams) => Promise<true>

export interface PromoteChatMemberParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number
  /**
   * Pass *True*, if the administrator's presence in the chat is hidden
   */
  is_anonymous?: boolean
  /**
   * Pass *True*, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege
   */
  can_manage_chat?: boolean
  /**
   * Pass *True*, if the administrator can create channel posts, channels only
   */
  can_post_messages?: boolean
  /**
   * Pass *True*, if the administrator can edit messages of other users and can pin messages, channels only
   */
  can_edit_messages?: boolean
  /**
   * Pass *True*, if the administrator can delete messages of other users
   */
  can_delete_messages?: boolean
  /**
   * Pass *True*, if the administrator can manage video chats
   */
  can_manage_video_chats?: boolean
  /**
   * Pass *True*, if the administrator can restrict, ban or unban chat members
   */
  can_restrict_members?: boolean
  /**
   * Pass *True*, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by him)
   */
  can_promote_members?: boolean
  /**
   * Pass *True*, if the administrator can change chat title, photo and other settings
   */
  can_change_info?: boolean
  /**
   * Pass *True*, if the administrator can invite new users to the chat
   */
  can_invite_users?: boolean
  /**
   * Pass *True*, if the administrator can pin messages, supergroups only
   */
  can_pin_messages?: boolean

  [key: string]: any
}

/**
 * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass *False* for all boolean parameters to demote a user. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#promotechatmember)
 */
export type promoteChatMember = (params: PromoteChatMemberParams) => Promise<true>

export interface SetChatAdministratorCustomTitleParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number
  /**
   * New custom title for the administrator; 0-16 characters, emoji are not allowed
   */
  custom_title: string

  [key: string]: any
}

/**
 * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchatadministratorcustomtitle)
 */
export type setChatAdministratorCustomTitle = (params: SetChatAdministratorCustomTitleParams) => Promise<true>

export interface BanChatSenderChatParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target sender chat
   */
  sender_chat_id: number

  [key: string]: any
}

/**
 * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is [unbanned](https://core.telegram.org/bots/api/#unbanchatsenderchat), the owner of the banned chat won't be able to send messages on behalf of **any of their channels**. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#banchatsenderchat)
 */
export type banChatSenderChat = (params: BanChatSenderChatParams) => Promise<true>

export interface UnbanChatSenderChatParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target sender chat
   */
  sender_chat_id: number

  [key: string]: any
}

/**
 * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#unbanchatsenderchat)
 */
export type unbanChatSenderChat = (params: UnbanChatSenderChatParams) => Promise<true>

export interface SetChatPermissionsParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
   */
  chat_id: number | string
  /**
   * A JSON-serialized object for new default chat permissions
   */
  permissions: Interfaces.TelegramChatPermissions

  [key: string]: any
}

/**
 * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the *can\_restrict\_members* administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchatpermissions)
 */
export type setChatPermissions = (params: SetChatPermissionsParams) => Promise<true>

export interface ExportChatInviteLinkParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as *String* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#exportchatinvitelink)
 */
export type exportChatInviteLink = (params: ExportChatInviteLinkParams) => Promise<string>

export interface CreateChatInviteLinkParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Invite link name; 0-32 characters
   */
  name?: string
  /**
   * Point in time (Unix timestamp) when the link will expire
   */
  expire_date?: number
  /**
   * Maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
   */
  member_limit?: number
  /**
   * *True*, if users joining the chat via the link need to be approved by chat administrators. If *True*, *member\_limit* can't be specified
   */
  creates_join_request?: boolean

  [key: string]: any
}

/**
 * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api/#revokechatinvitelink). Returns the new invite link as [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#createchatinvitelink)
 */
export type createChatInviteLink = (params: CreateChatInviteLinkParams) => Promise<Interfaces.TelegramChatInviteLink>

export interface EditChatInviteLinkParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * The invite link to edit
   */
  invite_link: string
  /**
   * Invite link name; 0-32 characters
   */
  name?: string
  /**
   * Point in time (Unix timestamp) when the link will expire
   */
  expire_date?: number
  /**
   * Maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
   */
  member_limit?: number
  /**
   * *True*, if users joining the chat via the link need to be approved by chat administrators. If *True*, *member\_limit* can't be specified
   */
  creates_join_request?: boolean

  [key: string]: any
}

/**
 * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#editchatinvitelink)
 */
export type editChatInviteLink = (params: EditChatInviteLinkParams) => Promise<Interfaces.TelegramChatInviteLink>

export interface RevokeChatInviteLinkParams {
  /**
   * Unique identifier of the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * The invite link to revoke
   */
  invite_link: string

  [key: string]: any
}

/**
 * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#revokechatinvitelink)
 */
export type revokeChatInviteLink = (params: RevokeChatInviteLinkParams) => Promise<Interfaces.TelegramChatInviteLink>

export interface ApproveChatJoinRequestParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number

  [key: string]: any
}

/**
 * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the *can\_invite\_users* administrator right. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#approvechatjoinrequest)
 */
export type approveChatJoinRequest = (params: ApproveChatJoinRequestParams) => Promise<true>

export interface DeclineChatJoinRequestParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number

  [key: string]: any
}

/**
 * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the *can\_invite\_users* administrator right. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#declinechatjoinrequest)
 */
export type declineChatJoinRequest = (params: DeclineChatJoinRequestParams) => Promise<true>

export interface SetChatPhotoParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * New chat photo, uploaded using multipart/form-data
   */
  photo: MediaInput

  [key: string]: any
}

/**
 * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchatphoto)
 */
export type setChatPhoto = (params: SetChatPhotoParams) => Promise<true>

export interface DeleteChatPhotoParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#deletechatphoto)
 */
export type deleteChatPhoto = (params: DeleteChatPhotoParams) => Promise<true>

export interface SetChatTitleParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * New chat title, 1-255 characters
   */
  title: string

  [key: string]: any
}

/**
 * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchattitle)
 */
export type setChatTitle = (params: SetChatTitleParams) => Promise<true>

export interface SetChatDescriptionParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * New chat description, 0-255 characters
   */
  description?: string

  [key: string]: any
}

/**
 * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchatdescription)
 */
export type setChatDescription = (params: SetChatDescriptionParams) => Promise<true>

export interface PinChatMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Identifier of a message to pin
   */
  message_id: number
  /**
   * Pass *True*, if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats.
   */
  disable_notification?: boolean

  [key: string]: any
}

/**
 * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can\_pin\_messages' administrator right in a supergroup or 'can\_edit\_messages' administrator right in a channel. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#pinchatmessage)
 */
export type pinChatMessage = (params: PinChatMessageParams) => Promise<true>

export interface UnpinChatMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned.
   */
  message_id?: number

  [key: string]: any
}

/**
 * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can\_pin\_messages' administrator right in a supergroup or 'can\_edit\_messages' administrator right in a channel. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#unpinchatmessage)
 */
export type unpinChatMessage = (params: UnpinChatMessageParams) => Promise<true>

export interface UnpinAllChatMessagesParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can\_pin\_messages' administrator right in a supergroup or 'can\_edit\_messages' administrator right in a channel. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#unpinallchatmessages)
 */
export type unpinAllChatMessages = (params: UnpinAllChatMessagesParams) => Promise<true>

export interface LeaveChatParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method for your bot to leave a group, supergroup or channel. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#leavechat)
 */
export type leaveChat = (params: LeaveChatParams) => Promise<true>

export interface GetChatParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a [Chat](https://core.telegram.org/bots/api/#chat) object on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getchat)
 */
export type getChat = (params: GetChatParams) => Promise<Interfaces.TelegramChat>

export interface GetChatAdministratorsParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to get a list of administrators in a chat. On success, returns an Array of [ChatMember](https://core.telegram.org/bots/api/#chatmember) objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getchatadministrators)
 */
export type getChatAdministrators = (params: GetChatAdministratorsParams) => Promise<Interfaces.TelegramChatMember[]>

export interface GetChatMemberCountParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to get the number of members in a chat. Returns *Int* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getchatmembercount)
 */
export type getChatMemberCount = (params: GetChatMemberCountParams) => Promise<number>

export interface GetChatMemberParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Unique identifier of the target user
   */
  user_id: number

  [key: string]: any
}

/**
 * Use this method to get information about a member of a chat. Returns a [ChatMember](https://core.telegram.org/bots/api/#chatmember) object on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getchatmember)
 */
export type getChatMember = (params: GetChatMemberParams) => Promise<Interfaces.TelegramChatMember>

export interface SetChatStickerSetParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
   */
  chat_id: number | string
  /**
   * Name of the sticker set to be set as the group sticker set
   */
  sticker_set_name: string

  [key: string]: any
}

/**
 * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field *can\_set\_sticker\_set* optionally returned in [getChat](https://core.telegram.org/bots/api/#getchat) requests to check if the bot can use this method. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchatstickerset)
 */
export type setChatStickerSet = (params: SetChatStickerSetParams) => Promise<true>

export interface DeleteChatStickerSetParams {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
   */
  chat_id: number | string

  [key: string]: any
}

/**
 * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field *can\_set\_sticker\_set* optionally returned in [getChat](https://core.telegram.org/bots/api/#getchat) requests to check if the bot can use this method. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#deletechatstickerset)
 */
export type deleteChatStickerSet = (params: DeleteChatStickerSetParams) => Promise<true>

export interface AnswerCallbackQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  callback_query_id: string
  /**
   * Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   */
  text?: string
  /**
   * If *True*, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to *false*.
   */
  show_alert?: boolean
  /**
   * URL that will be opened by the user's client. If you have created a [Game](https://core.telegram.org/bots/api/#game) and accepted the conditions via [@Botfather](https://t.me/botfather), specify the URL that opens your game — note that this will only work if the query comes from a [*callback\_game*](https://core.telegram.org/bots/api/#inlinekeyboardbutton) button.  
   * 
   * Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
   */
  url?: string
  /**
   * The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0.
   */
  cache_time?: number

  [key: string]: any
}

/**
 * Use this method to send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating). The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, *True* is returned.
 * 
 * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via [@Botfather](https://t.me/botfather) and accept the terms. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#answercallbackquery)
 */
export type answerCallbackQuery = (params: AnswerCallbackQueryParams) => Promise<true>

export interface SetMyCommandsParams {
  /**
   * A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
   */
  commands: Interfaces.TelegramBotCommand[]
  /**
   * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault).
   */
  scope?: Interfaces.TelegramBotCommandScope
  /**
   * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
   */
  language_code?: string

  [key: string]: any
}

/**
 * Use this method to change the list of the bot's commands. See [https://core.telegram.org/bots#commands](https://core.telegram.org/bots#commands) for more details about bot commands. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setmycommands)
 */
export type setMyCommands = (params: SetMyCommandsParams) => Promise<true>

export interface DeleteMyCommandsParams {
  /**
   * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault).
   */
  scope?: Interfaces.TelegramBotCommandScope
  /**
   * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
   */
  language_code?: string

  [key: string]: any
}

/**
 * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, [higher level commands](https://core.telegram.org/bots/api/#determining-list-of-commands) will be shown to affected users. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#deletemycommands)
 */
export type deleteMyCommands = (params?: DeleteMyCommandsParams) => Promise<true>

export interface GetMyCommandsParams {
  /**
   * A JSON-serialized object, describing scope of users. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault).
   */
  scope?: Interfaces.TelegramBotCommandScope
  /**
   * A two-letter ISO 639-1 language code or an empty string
   */
  language_code?: string

  [key: string]: any
}

/**
 * Use this method to get the current list of the bot's commands for the given scope and user language. Returns Array of [BotCommand](https://core.telegram.org/bots/api/#botcommand) on success. If commands aren't set, an empty list is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getmycommands)
 */
export type getMyCommands = (params?: GetMyCommandsParams) => Promise<Interfaces.TelegramBotCommand[]>

export interface SetChatMenuButtonParams {
  /**
   * Unique identifier for the target private chat. If not specified, default bot's menu button will be changed
   */
  chat_id?: number
  /**
   * A JSON-serialized object for the bot's new menu button. Defaults to [MenuButtonDefault](https://core.telegram.org/bots/api/#menubuttondefault)
   */
  menu_button?: Interfaces.TelegramMenuButton

  [key: string]: any
}

/**
 * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setchatmenubutton)
 */
export type setChatMenuButton = (params?: SetChatMenuButtonParams) => Promise<true>

export interface GetChatMenuButtonParams {
  /**
   * Unique identifier for the target private chat. If not specified, default bot's menu button will be returned
   */
  chat_id?: number

  [key: string]: any
}

/**
 * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns [MenuButton](https://core.telegram.org/bots/api/#menubutton) on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getchatmenubutton)
 */
export type getChatMenuButton = (params?: GetChatMenuButtonParams) => Promise<Interfaces.TelegramMenuButton>

export interface SetMyDefaultAdministratorRightsParams {
  /**
   * A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared.
   */
  rights?: Interfaces.TelegramChatAdministratorRights
  /**
   * Pass *True* to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
   */
  for_channels?: boolean

  [key: string]: any
}

/**
 * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are are free to modify the list before adding the bot. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setmydefaultadministratorrights)
 */
export type setMyDefaultAdministratorRights = (params?: SetMyDefaultAdministratorRightsParams) => Promise<true>

export interface GetMyDefaultAdministratorRightsParams {
  /**
   * Pass *True* to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
   */
  for_channels?: boolean

  [key: string]: any
}

/**
 * Use this method to get the current default administrator rights of the bot. Returns [ChatAdministratorRights](https://core.telegram.org/bots/api/#chatadministratorrights) on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getmydefaultadministratorrights)
 */
export type getMyDefaultAdministratorRights = (params?: GetMyDefaultAdministratorRightsParams) => Promise<Interfaces.TelegramChatAdministratorRights>

export interface EditMessageTextParams {
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string
  /**
   * New text of the message, 1-4096 characters after entities parsing
   */
  text: string
  /**
   * Mode for parsing entities in the message text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified instead of *parse\_mode*
   */
  entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_preview?: boolean
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to edit text and [game](https://core.telegram.org/bots/api/#games) messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#editmessagetext)
 */
export type editMessageText = (params: EditMessageTextParams) => Promise<Interfaces.TelegramMessage | true>

export interface EditMessageCaptionParams {
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string
  /**
   * New caption of the message, 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the message caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
   */
  caption_entities?: MessageEntity[] | Interfaces.TelegramMessageEntity[]
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#editmessagecaption)
 */
export type editMessageCaption = (params?: EditMessageCaptionParams) => Promise<Interfaces.TelegramMessage | true>

export interface EditMessageMediaParams {
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string
  /**
   * A JSON-serialized object for a new media content of the message
   */
  media: Interfaces.TelegramInputMedia
  /**
   * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file\_id or specify a URL. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#editmessagemedia)
 */
export type editMessageMedia = (params: EditMessageMediaParams) => Promise<Interfaces.TelegramMessage | true>

export interface EditMessageReplyMarkupParams {
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#editmessagereplymarkup)
 */
export type editMessageReplyMarkup = (params?: EditMessageReplyMarkupParams) => Promise<Interfaces.TelegramMessage | true>

export interface StopPollParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Identifier of the original message with the poll
   */
  message_id: number
  /**
   * A JSON-serialized object for a new message [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to stop a poll which was sent by the bot. On success, the stopped [Poll](https://core.telegram.org/bots/api/#poll) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#stoppoll)
 */
export type stopPoll = (params: StopPollParams) => Promise<Interfaces.TelegramPoll>

export interface DeleteMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Identifier of the message to delete
   */
  message_id: number

  [key: string]: any
}

/**
 * Use this method to delete a message, including service messages, with the following limitations:  
 * \- A message can only be deleted if it was sent less than 48 hours ago.  
 * \- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.  
 * \- Bots can delete outgoing messages in private chats, groups, and supergroups.  
 * \- Bots can delete incoming messages in private chats.  
 * \- Bots granted *can\_post\_messages* permissions can delete outgoing messages in channels.  
 * \- If the bot is an administrator of a group, it can delete any message there.  
 * \- If the bot has *can\_delete\_messages* permission in a supergroup or a channel, it can delete any message there.  
 * Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#deletemessage)
 */
export type deleteMessage = (params: DeleteMessageParams) => Promise<true>

export interface SendStickerParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Sticker to send. Pass a file\_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  sticker: MediaInput
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [custom reply keyboard](https://core.telegram.org/bots#keyboards), instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send static .WEBP, [animated](https://telegram.org/blog/animated-stickers) .TGS, or [video](https://telegram.org/blog/video-stickers-better-reactions) .WEBM stickers. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendsticker)
 */
export type sendSticker = (params: SendStickerParams) => Promise<Interfaces.TelegramMessage>

export interface GetStickerSetParams {
  /**
   * Name of the sticker set
   */
  name: string

  [key: string]: any
}

/**
 * Use this method to get a sticker set. On success, a [StickerSet](https://core.telegram.org/bots/api/#stickerset) object is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getstickerset)
 */
export type getStickerSet = (params: GetStickerSetParams) => Promise<Interfaces.TelegramStickerSet>

export interface UploadStickerFileParams {
  /**
   * User identifier of sticker file owner
   */
  user_id: number
  /**
   * **PNG** image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  png_sticker: MediaInput

  [key: string]: any
}

/**
 * Use this method to upload a .PNG file with a sticker for later use in *createNewStickerSet* and *addStickerToSet* methods (can be used multiple times). Returns the uploaded [File](https://core.telegram.org/bots/api/#file) on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#uploadstickerfile)
 */
export type uploadStickerFile = (params: UploadStickerFileParams) => Promise<Interfaces.TelegramFile>

export interface CreateNewStickerSetParams {
  /**
   * User identifier of created sticker set owner
   */
  user_id: number
  /**
   * Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., *animals*). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>` is case insensitive. 1-64 characters.
   */
  name: string
  /**
   * Sticker set title, 1-64 characters
   */
  title: string
  /**
   * **PNG** image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a *file\_id* as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  png_sticker?: MediaInput
  /**
   * **TGS** animation with the sticker, uploaded using multipart/form-data. See [https://core.telegram.org/stickers#animated-sticker-requirements](https://core.telegram.org/stickers#animated-sticker-requirements) for technical requirements
   */
  tgs_sticker?: MediaInput
  /**
   * **WEBM** video with the sticker, uploaded using multipart/form-data. See [https://core.telegram.org/stickers#video-sticker-requirements](https://core.telegram.org/stickers#video-sticker-requirements) for technical requirements
   */
  webm_sticker?: MediaInput
  /**
   * One or more emoji corresponding to the sticker
   */
  emojis: string
  /**
   * Pass *True*, if a set of mask stickers should be created
   */
  contains_masks?: boolean
  /**
   * A JSON-serialized object for position where the mask should be placed on faces
   */
  mask_position?: Interfaces.TelegramMaskPosition

  [key: string]: any
}

/**
 * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. You **must** use exactly one of the fields *png\_sticker*, *tgs\_sticker*, or *webm\_sticker*. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#createnewstickerset)
 */
export type createNewStickerSet = (params: CreateNewStickerSetParams) => Promise<true>

export interface AddStickerToSetParams {
  /**
   * User identifier of sticker set owner
   */
  user_id: number
  /**
   * Sticker set name
   */
  name: string
  /**
   * **PNG** image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a *file\_id* as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
   */
  png_sticker?: MediaInput
  /**
   * **TGS** animation with the sticker, uploaded using multipart/form-data. See [https://core.telegram.org/stickers#animated-sticker-requirements](https://core.telegram.org/stickers#animated-sticker-requirements) for technical requirements
   */
  tgs_sticker?: MediaInput
  /**
   * **WEBM** video with the sticker, uploaded using multipart/form-data. See [https://core.telegram.org/stickers#video-sticker-requirements](https://core.telegram.org/stickers#video-sticker-requirements) for technical requirements
   */
  webm_sticker?: MediaInput
  /**
   * One or more emoji corresponding to the sticker
   */
  emojis: string
  /**
   * A JSON-serialized object for position where the mask should be placed on faces
   */
  mask_position?: Interfaces.TelegramMaskPosition

  [key: string]: any
}

/**
 * Use this method to add a new sticker to a set created by the bot. You **must** use exactly one of the fields *png\_sticker*, *tgs\_sticker*, or *webm\_sticker*. Animated stickers can be added to animated sticker sets and only to them. Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#addstickertoset)
 */
export type addStickerToSet = (params: AddStickerToSetParams) => Promise<true>

export interface SetStickerPositionInSetParams {
  /**
   * File identifier of the sticker
   */
  sticker: string
  /**
   * New sticker position in the set, zero-based
   */
  position: number

  [key: string]: any
}

/**
 * Use this method to move a sticker in a set created by the bot to a specific position. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setstickerpositioninset)
 */
export type setStickerPositionInSet = (params: SetStickerPositionInSetParams) => Promise<true>

export interface DeleteStickerFromSetParams {
  /**
   * File identifier of the sticker
   */
  sticker: string

  [key: string]: any
}

/**
 * Use this method to delete a sticker from a set created by the bot. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#deletestickerfromset)
 */
export type deleteStickerFromSet = (params: DeleteStickerFromSetParams) => Promise<true>

export interface SetStickerSetThumbParams {
  /**
   * Sticker set name
   */
  name: string
  /**
   * User identifier of the sticker set owner
   */
  user_id: number
  /**
   * A **PNG** image with the thumbnail, must be up to 128 kilobytes in size and have width and height exactly 100px, or a **TGS** animation with the thumbnail up to 32 kilobytes in size; see [https://core.telegram.org/stickers#animated-sticker-requirements](https://core.telegram.org/stickers#animated-sticker-requirements) for animated sticker technical requirements, or a **WEBM** video with the thumbnail up to 32 kilobytes in size; see [https://core.telegram.org/stickers#video-sticker-requirements](https://core.telegram.org/stickers#video-sticker-requirements) for video sticker technical requirements. Pass a *file\_id* as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files). Animated sticker set thumbnails can't be uploaded via HTTP URL.
   */
  thumb?: MediaInput

  [key: string]: any
}

/**
 * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker sets only. Video thumbnails can be set only for video sticker sets only. Returns *True* on success.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setstickersetthumb)
 */
export type setStickerSetThumb = (params: SetStickerSetThumbParams) => Promise<true>

export interface AnswerInlineQueryParams {
  /**
   * Unique identifier for the answered query
   */
  inline_query_id: string
  /**
   * A JSON-serialized array of results for the inline query
   */
  results: Interfaces.TelegramInlineQueryResult[]
  /**
   * The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300.
   */
  cache_time?: number
  /**
   * Pass *True*, if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query
   */
  is_personal?: boolean
  /**
   * Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes.
   */
  next_offset?: string
  /**
   * If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter *switch\_pm\_parameter*
   */
  switch_pm_text?: string
  /**
   * [Deep-linking](https://core.telegram.org/bots#deep-linking) parameter for the /start message sent to the bot when user presses the switch button. 1-64 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed.  
   * 
   * *Example:* An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a [*switch\_inline*](https://core.telegram.org/bots/api/#inlinekeyboardmarkup) button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities.
   */
  switch_pm_parameter?: string

  [key: string]: any
}

/**
 * Use this method to send answers to an inline query. On success, *True* is returned.  
 * No more than **50** results per query are allowed.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#answerinlinequery)
 */
export type answerInlineQuery = (params: AnswerInlineQueryParams) => Promise<true>

export interface AnswerWebAppQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  web_app_query_id: string
  /**
   * A JSON-serialized object describing the message to be sent
   */
  result: Interfaces.TelegramInlineQueryResult

  [key: string]: any
}

/**
 * Use this method to set the result of an interaction with a [Web App](https://core.telegram.org/bots/webapps) and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a [SentWebAppMessage](https://core.telegram.org/bots/api/#sentwebappmessage) object is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#answerwebappquery)
 */
export type answerWebAppQuery = (params: AnswerWebAppQueryParams) => Promise<Interfaces.TelegramSentWebAppMessage>

export interface SendInvoiceParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string
  /**
   * Product name, 1-32 characters
   */
  title: string
  /**
   * Product description, 1-255 characters
   */
  description: string
  /**
   * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
   */
  payload: string
  /**
   * Payments provider token, obtained via [Botfather](https://t.me/botfather)
   */
  provider_token: string
  /**
   * Three-letter ISO 4217 currency code, see [more on currencies](https://core.telegram.org/bots/payments#supported-currencies)
   */
  currency: Interfaces.Currency
  /**
   * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
   */
  prices: Interfaces.TelegramLabeledPrice[]
  /**
   * The maximum accepted amount for tips in the *smallest units* of the currency (integer, **not** float/double). For example, for a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0
   */
  max_tip_amount?: number
  /**
   * A JSON-serialized array of suggested amounts of tips in the *smallest units* of the currency (integer, **not** float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed *max\_tip\_amount*.
   */
  suggested_tip_amounts?: number[]
  /**
   * Unique deep-linking parameter. If left empty, **forwarded copies** of the sent message will have a *Pay* button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a *URL* button with a deep link to the bot (instead of a *Pay* button), with the value used as the start parameter
   */
  start_parameter?: string
  /**
   * A JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
   */
  provider_data?: string
  /**
   * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for.
   */
  photo_url?: string
  /**
   * Photo size
   */
  photo_size?: number
  /**
   * Photo width
   */
  photo_width?: number
  /**
   * Photo height
   */
  photo_height?: number
  /**
   * Pass *True*, if you require the user's full name to complete the order
   */
  need_name?: boolean
  /**
   * Pass *True*, if you require the user's phone number to complete the order
   */
  need_phone_number?: boolean
  /**
   * Pass *True*, if you require the user's email address to complete the order
   */
  need_email?: boolean
  /**
   * Pass *True*, if you require the user's shipping address to complete the order
   */
  need_shipping_address?: boolean
  /**
   * Pass *True*, if user's phone number should be sent to provider
   */
  send_phone_number_to_provider?: boolean
  /**
   * Pass *True*, if user's email address should be sent to provider
   */
  send_email_to_provider?: boolean
  /**
   * Pass *True*, if the final price depends on the shipping method
   */
  is_flexible?: boolean
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating). If empty, one 'Pay `total price`' button will be shown. If not empty, the first button must be a Pay button.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send invoices. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendinvoice)
 */
export type sendInvoice = (params: SendInvoiceParams) => Promise<Interfaces.TelegramMessage>

export interface AnswerShippingQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  shipping_query_id: string
  /**
   * Specify *True* if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
   */
  ok: boolean
  /**
   * Required if *ok* is *True*. A JSON-serialized array of available shipping options.
   */
  shipping_options?: Interfaces.TelegramShippingOption[]
  /**
   * Required if *ok* is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
   */
  error_message?: string

  [key: string]: any
}

/**
 * If you sent an invoice requesting a shipping address and the parameter *is\_flexible* was specified, the Bot API will send an [Update](https://core.telegram.org/bots/api/#update) with a *shipping\_query* field to the bot. Use this method to reply to shipping queries. On success, *True* is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#answershippingquery)
 */
export type answerShippingQuery = (params: AnswerShippingQueryParams) => Promise<true>

export interface AnswerPreCheckoutQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  pre_checkout_query_id: string
  /**
   * Specify *True* if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use *False* if there are any problems.
   */
  ok: boolean
  /**
   * Required if *ok* is *False*. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
   */
  error_message?: string

  [key: string]: any
}

/**
 * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an [Update](https://core.telegram.org/bots/api/#update) with the field *pre\_checkout\_query*. Use this method to respond to such pre-checkout queries. On success, *True* is returned. **Note:** The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#answerprecheckoutquery)
 */
export type answerPreCheckoutQuery = (params: AnswerPreCheckoutQueryParams) => Promise<true>

export interface SetPassportDataErrorsParams {
  /**
   * User identifier
   */
  user_id: number
  /**
   * A JSON-serialized array describing the errors
   */
  errors: Interfaces.TelegramPassportElementError[]

  [key: string]: any
}

/**
 * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns *True* on success.
 * 
 * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setpassportdataerrors)
 */
export type setPassportDataErrors = (params: SetPassportDataErrorsParams) => Promise<true>

export interface SendGameParams {
  /**
   * Unique identifier for the target chat
   */
  chat_id: number
  /**
   * Short name of the game, serves as the unique identifier for the game. Set up your games via [Botfather](https://t.me/botfather).
   */
  game_short_name: string
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass *True*, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating). If empty, one 'Play game\_title' button will be shown. If not empty, the first button must launch the game.
   */
  reply_markup?: Interfaces.ReplyMarkupUnion

  [key: string]: any
}

/**
 * Use this method to send a game. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#sendgame)
 */
export type sendGame = (params: SendGameParams) => Promise<Interfaces.TelegramMessage>

export interface SetGameScoreParams {
  /**
   * User identifier
   */
  user_id: number
  /**
   * New score, must be non-negative
   */
  score: number
  /**
   * Pass *True*, if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters
   */
  force?: boolean
  /**
   * Pass *True*, if the game message should not be automatically edited to include the current scoreboard
   */
  disable_edit_message?: boolean
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat
   */
  chat_id?: number
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the sent message
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string

  [key: string]: any
}

/**
 * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned. Returns an error, if the new score is not greater than the user's current score in the chat and *force* is *False*.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#setgamescore)
 */
export type setGameScore = (params: SetGameScoreParams) => Promise<Interfaces.TelegramMessage | true>

export interface GetGameHighScoresParams {
  /**
   * Target user id
   */
  user_id: number
  /**
   * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat
   */
  chat_id?: number
  /**
   * Required if *inline\_message\_id* is not specified. Identifier of the sent message
   */
  message_id?: number
  /**
   * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
   */
  inline_message_id?: string

  [key: string]: any
}

/**
 * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. On success, returns an *Array* of [GameHighScore](https://core.telegram.org/bots/api/#gamehighscore) objects.
 * 
 * This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and his neighbors are not among them. Please note that this behavior is subject to change.
 * 
 * ---
 * 
 * [**Documentation**](https://core.telegram.org/bots/api/#getgamehighscores)
 */
export type getGameHighScores = (params: GetGameHighScoresParams) => Promise<Interfaces.TelegramGameHighScore[]>