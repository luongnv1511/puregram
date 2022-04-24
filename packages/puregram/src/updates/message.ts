import { inspectable } from 'inspectable'

import {
  TelegramMessage,
  TelegramMessageEntity,
  TelegramPhotoSize,
  TelegramUser
} from '../telegram-interfaces'

import { User } from '../common/structures/user'
import { Chat } from '../common/structures/chat'
import { ForwardMessage } from '../common/structures/forward-message'
import { MessageEntity } from '../common/structures/message-entity'
import { PhotoSize } from '../common/structures/photo-size'
import { Contact } from '../common/structures/contact'
import { Game } from '../common/structures/game'
import { Poll } from '../common/structures/poll'
import { Venue } from '../common/structures/venue'
import { Location } from '../common/structures/location'
import { Invoice } from '../common/structures/invoice'
import { Dice } from '../common/structures/dice'
import { SuccessfulPayment } from '../common/structures/successful-payment'
import { PassportData } from '../common/structures/passport-data'
import { InlineKeyboardMarkup } from '../common/structures/inline-keyboard-markup'
import { MessageAutoDeleteTimerChanged } from '../common/structures/message-auto-delete-timer-changed'
import { VideoChatEnded } from '../common/structures/video-chat-ended'
import { VideoChatParticipantsInvited } from '../common/structures/video-chat-participants-invited'
import { VideoChatStarted } from '../common/structures/video-chat-started'
import { VideoChatScheduled } from '../common/structures/video-chat-scheduled'
import { ProximityAlertTriggered } from '../common/structures/proximity-alert-triggered'
import { WebAppData } from '../common/structures/web-app-data'

import {
  AnimationAttachment,
  AudioAttachment,
  DocumentAttachment,
  VideoAttachment,
  VideoNoteAttachment,
  StickerAttachment,
  VoiceAttachment
} from '../common/attachments'

import { filterPayload } from '../utils/helpers'

/** This object represents a message. */
export class Message {
  constructor(public payload: TelegramMessage) { }

  get [Symbol.toStringTag](): string {
    return this.constructor.name
  }

  /** Unique message identifier inside this chat */
  get id(): number {
    return this.payload.message_id
  }

  /** Sender, empty for messages sent to channels */
  get from(): User | undefined {
    const { from } = this.payload

    if (!from) {
      return
    }

    return new User(from)
  }

  /**
   * Sender of the message, sent on behalf of a chat.
   * The channel itself for channel messages.
   * The supergroup itself for messages from anonymous group administrators.
   * The linked channel for messages automatically forwarded to the discussion group
   */
  get senderChat(): Chat | undefined {
    const { sender_chat } = this.payload

    if (!sender_chat) {
      return
    }

    return new Chat(sender_chat)
  }

  /** Date the message was sent in Unix time */
  get createdAt(): number {
    return this.payload.date
  }

  /** Conversation the message belongs to */
  get chat(): Chat | undefined {
    const { chat } = this.payload

    if (!chat) {
      return
    }

    return new Chat(chat)
  }

  /** Forwarded message if there is any */
  get forwardMessage(): ForwardMessage | undefined {
    const { forward_date } = this.payload

    if (!forward_date) {
      return
    }

    return new ForwardMessage(this.payload)
  }

  /** For replies, the original message */
  get replyMessage(): Omit<Message, 'replyMessage'> | undefined {
    const { reply_to_message } = this.payload

    if (!reply_to_message) {
      return
    }

    return new Message(reply_to_message)
  }

  /** Bot through which the message was sent */
  get viaBot(): User | undefined {
    const { via_bot } = this.payload

    if (!via_bot) {
      return
    }

    return new User(via_bot)
  }

  /** Date the message was last edited in Unix time */
  get updatedAt(): number | undefined {
    return this.payload.edit_date
  }

  /** `true`, if the message can't be forwarded */
  get hasProtectedContent(): true | undefined {
    return this.payload.has_protected_content as true | undefined
  }

  /** The unique identifier of a media message group this message belongs to */
  get mediaGroupId(): string | undefined {
    return this.payload.media_group_id
  }

  /**
   * Signature of the post author for messages in channels,
   * or the custom title of an anonymous group administrator
   */
  get authorSignature(): string | undefined {
    return this.payload.author_signature
  }

  /**
   * For text messages, the actual UTF-8 text of the message, 0-4096 characters
   */
  get text(): string | undefined {
    return this.payload.text
  }

  /**
   * For text messages, special entities like usernames, URLs, bot commands,
   * etc. that appear in the text
   */
  get entities(): MessageEntity[] {
    const { entities } = this.payload

    if (!entities) {
      return []
    }

    return entities.map(
      (entity: TelegramMessageEntity) => new MessageEntity(entity)
    )
  }

  /**
   * Attachments
   *
   * I would like to create a function like
   * `getMessageAttachment<Audio>('audio')`
   * which automatically takes `audio` from `this.payload`
   * and if it exists creates `new Audio(audio)`
   *
   * :(
   */

  /**
   * Message is an animation, information about the animation. For backward
   * compatibility, when this field is set, the `document` field will also be set
   */
  get animation(): AnimationAttachment | undefined {
    const { animation } = this.payload

    if (!animation) {
      return
    }

    return new AnimationAttachment(animation)
  }

  /** Message is an audio file, information about the file */
  get audio(): AudioAttachment | undefined {
    const { audio } = this.payload

    if (!audio) {
      return
    }

    return new AudioAttachment(audio)
  }

  /** Message is a general file, information about the file */
  get document(): DocumentAttachment | undefined {
    const { document } = this.payload

    if (!document) {
      return
    }

    return new DocumentAttachment(document)
  }

  /** Message is a photo, available sizes of the photo */
  get photo(): PhotoSize[] | undefined {
    const { photo } = this.payload

    if (!photo) {
      return
    }

    return photo.map(
      (size: TelegramPhotoSize) => new PhotoSize(size)
    )
  }

  /** Message is a sticker, information about the sticker */
  get sticker(): StickerAttachment | undefined {
    const { sticker } = this.payload

    if (!sticker) {
      return
    }

    return new StickerAttachment(sticker)
  }

  /** Message is a video, information about the video */
  get video(): VideoAttachment | undefined {
    const { video } = this.payload

    if (!video) {
      return
    }

    return new VideoAttachment(video)
  }

  /** Message is a video note, information about the video message */
  get videoNote(): VideoNoteAttachment | undefined {
    const { video_note } = this.payload

    if (!video_note) {
      return
    }

    return new VideoNoteAttachment(video_note)
  }

  /** Message is a voice message, information about the file */
  get voice(): VoiceAttachment | undefined {
    const { voice } = this.payload

    if (!voice) {
      return
    }

    return new VoiceAttachment(voice)
  }

  /**
   * Caption for the animation, audio, document, photo, video or voice,
   * 0-1024 characters
   */
  get caption(): string | undefined {
    return this.payload.caption
  }

  /**
   * For messages with a caption, special entities like usernames, URLs, bot
   * commands, etc. that appear in the caption
   */
  get captionEntities(): MessageEntity[] {
    const { caption_entities } = this.payload

    if (!caption_entities) {
      return []
    }

    return caption_entities.map(
      (entity: TelegramMessageEntity) => new MessageEntity(entity)
    )
  }

  /** Message is a shared contact, information about the contact */
  get contact(): Contact | undefined {
    const { contact } = this.payload

    if (!contact) {
      return
    }

    return new Contact(contact)
  }

  /** Message is a dice with random value from 1 to 6 */
  get dice(): Dice | undefined {
    const { dice } = this.payload

    if (!dice) {
      return
    }

    return new Dice(dice)
  }

  /** Message is a game, information about the game */
  get game(): Game | undefined {
    const { game } = this.payload

    if (!game) {
      return
    }

    return new Game(game)
  }

  /** Message is a native poll, information about the poll */
  get poll(): Poll | undefined {
    const { poll } = this.payload

    if (!poll) {
      return
    }

    return new Poll(poll)
  }

  /**
   * Message is a venue, information about the venue.
   * For backward compatibility, when this field is set,
   * the `location` field will also be set
   */
  get venue(): Venue | undefined {
    const { venue } = this.payload

    if (!venue) {
      return
    }

    return new Venue(venue)
  }

  /** Message is a shared location, information about the location */
  get location(): Location | undefined {
    const { location } = this.payload

    if (!location) {
      return
    }

    return new Location(location)
  }

  // Events

  /**
   * New members that were added to the group or supergroup and information
   * about them (the bot itself may be one of these members)
   */
  get newChatMembers(): User[] {
    const { new_chat_members } = this.payload

    if (!new_chat_members) {
      return []
    }

    return new_chat_members.map(
      (member: TelegramUser) => new User(member)
    )
  }

  /**
   * A member was removed from the group, information about them (this member
   * may be the bot itself)
   */
  get leftChatMember(): User | undefined {
    const { left_chat_member } = this.payload

    if (!left_chat_member) {
      return
    }

    return new User(left_chat_member)
  }

  /** A chat title was changed to this value */
  get newChatTitle(): string | undefined {
    return this.payload.new_chat_title
  }

  /** A chat photo was change to this value */
  get newChatPhoto(): PhotoSize[] {
    const { new_chat_photo } = this.payload

    if (!new_chat_photo) {
      return []
    }

    return new_chat_photo.map(
      (size: TelegramPhotoSize) => new PhotoSize(size)
    )
  }

  /** Service message: the chat photo was deleted */
  get deleteChatPhoto(): boolean | undefined {
    return this.payload.delete_chat_photo
  }

  /** Service message: the group has been created */
  get groupChatCreated(): boolean | undefined {
    return this.payload.group_chat_created
  }

  /**
   * Service message: the supergroup has been created. This field can't be
   * received in a message coming through updates, because bot can't be a
   * member of a supergroup when it is created. It can only be found in
   * `replyMessage` if someone replies to a very first message in a
   * directly created supergroup.
   */
  get supergroupChatCreated(): boolean | undefined {
    return this.payload.supergroup_chat_created
  }

  /** Service message: auto-delete timer settings changed in the chat */
  get messageAutoDeleteTimerChanged(): MessageAutoDeleteTimerChanged | undefined {
    const { message_auto_delete_timer_changed } = this.payload

    if (!message_auto_delete_timer_changed) return

    return new MessageAutoDeleteTimerChanged(message_auto_delete_timer_changed)
  }

  /**
   * Service message: the channel has been created. This field can't be
   * received in a message coming through updates, because bot can't be a
   * member of a channel when it is created. It can only be found in
   * `replyMessage` if someone replies to a very first message in a channel.
   */
  get channelChatCreated(): boolean | undefined {
    return this.payload.channel_chat_created
  }

  /**
   * The group has been migrated to a supergroup with the specified identifier.
   * This number may be greater than 32 bits and some programming languages may
   * have difficulty/silent defects in interpreting it. But it is smaller than
   * 52 bits, so a signed 64 bit integer or double-precision float type are
   * safe for storing this identifier.
   */
  get migrateToChatId(): number | undefined {
    return this.payload.migrate_to_chat_id
  }

  /**
   * The supergroup has been migrated from a group with the specified
   * identifier. This number may be greater than 32 bits and some programming
   * languages may have difficulty/silent defects in interpreting it. But it is
   * smaller than 52 bits, so a signed 64 bit integer or double-precision float
   * type are safe for storing this identifier.
   */
  get migrateFromChatId(): number | undefined {
    return this.payload.migrate_from_chat_id
  }

  /**
   * Specified message was pinned. Note that the Message object in this field
   * will not contain further `replyMessage` fields even if it is itself a
   * reply.
   */
  get pinnedMessage(): Omit<Message, 'replyMessage'> | undefined {
    const { pinned_message } = this.payload

    if (!pinned_message) {
      return
    }

    return new Message(pinned_message)
  }

  /** Message is an invoice for a payment, information about the invoice */
  get invoice(): Invoice | undefined {
    const { invoice } = this.payload

    if (!invoice) {
      return
    }

    return new Invoice(invoice)
  }

  /**
   * Message is a service message about a successful payment,
   * information about the payment.
   */
  get successfulPayment(): SuccessfulPayment | undefined {
    const { successful_payment } = this.payload

    if (!successful_payment) {
      return
    }

    return new SuccessfulPayment(successful_payment)
  }

  /** The domain name of the website on which the user has logged in. */
  get connectedWebsite(): string | undefined {
    return this.payload.connected_website
  }

  /** Telegram Passport data */
  get passportData(): PassportData | undefined {
    const { passport_data } = this.payload

    if (!passport_data) {
      return
    }

    return new PassportData(passport_data)
  }

  /**
   * Service message.
   * A user in the chat triggered another user's proximity alert
   * while sharing Live Location.
   */
  get proximityAlertTriggered(): ProximityAlertTriggered | undefined {
    const { proximity_alert_triggered } = this.payload

    if (!proximity_alert_triggered) {
      return
    }

    return new ProximityAlertTriggered(proximity_alert_triggered)
  }

  /** Service message: video chat scheduled */
  get videoChatScheduled(): VideoChatScheduled | undefined {
    const { video_chat_scheduled } = this.payload

    if (!video_chat_scheduled) return

    return new VideoChatScheduled(video_chat_scheduled)
  }

  /** Service message: video chat started */
  get videoChatStarted(): VideoChatStarted | undefined {
    const { video_chat_started } = this.payload

    if (!video_chat_started) return

    return new VideoChatStarted(video_chat_started)
  }

  /** Service message: video chat ended */
  get videoChatEnded(): VideoChatEnded | undefined {
    const { video_chat_ended } = this.payload

    if (!video_chat_ended) return

    return new VideoChatEnded(video_chat_ended)
  }

  /** Service message: new participants invited to a video chat */
  get videoChatParticipantsInvited(): VideoChatParticipantsInvited | undefined {
    const { video_chat_participants_invited } = this.payload

    if (!video_chat_participants_invited) return

    return new VideoChatParticipantsInvited(video_chat_participants_invited)
  }

  /** Service message: data sent by a Web App */
  get webAppData(): WebAppData | undefined {
    const { web_app_data } = this.payload

    if (!web_app_data) return

    return new WebAppData(web_app_data)
  }

  /**
   * Inline keyboard attached to the message.
   *
   * `login_url` buttons are represented as ordinary `url` buttons.
   */
  get replyMarkup(): InlineKeyboardMarkup | undefined {
    const { reply_markup } = this.payload

    if (!reply_markup) {
      return
    }

    return new InlineKeyboardMarkup(reply_markup)
  }
}

inspectable(Message, {
  serialize(message: Message) {
    const payload = {
      id: message.id,
      from: message.from,
      senderChat: message.senderChat,
      createdAt: message.createdAt,
      chat: message.chat,
      forwardMessage: message.forwardMessage,
      replyMessage: message.replyMessage,
      viaBot: message.viaBot,
      updatedAt: message.updatedAt,
      mediaGroupId: message.mediaGroupId,
      authorSignature: message.authorSignature,
      text: message.text,
      entities: message.entities,

      // Attachments

      animation: message.animation,
      audio: message.audio,
      document: message.document,
      photo: message.photo,
      sticker: message.sticker,
      video: message.video,
      videoNote: message.videoNote,
      voice: message.voice,

      caption: message.caption,
      captionEntities: message.captionEntities,

      contact: message.contact,
      dice: message.dice,
      game: message.game,
      poll: message.poll,
      venue: message.venue,
      location: message.location,

      // Events

      newChatMembers: message.newChatMembers,
      leftChatMember: message.leftChatMember,
      newChatTitle: message.newChatTitle,
      newChatPhoto: message.newChatPhoto,
      deleteChatPhoto: message.deleteChatPhoto,
      groupChatCreated: message.groupChatCreated,
      supergroupChatCreated: message.supergroupChatCreated,
      channelChatCreated: message.channelChatCreated,
      migrateToChatId: message.migrateToChatId,
      migrateFromChatId: message.migrateFromChatId,

      pinnedMessage: message.pinnedMessage,
      invoice: message.invoice,
      successfulPayment: message.successfulPayment,
      connectedWebsite: message.connectedWebsite,
      passportData: message.passportData,
      videoChatStarted: message.videoChatStarted,
      videoChatEnded: message.videoChatEnded,
      videoChatParticipantsInvited: message.videoChatParticipantsInvited,

      replyMarkup: message.replyMarkup
    }

    return filterPayload(payload)
  }
})
