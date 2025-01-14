import { inspectable } from 'inspectable'

import * as Interfaces from '../../generated/telegram-interfaces'
import { AttachmentType, Require } from '../../types/types'

import { PhotoSize, MaskPosition, File } from '../structures'

import { FileAttachment } from './file-attachment'

/** This object represents a sticker. */
export class StickerAttachment extends FileAttachment<Interfaces.TelegramSticker> {
  attachmentType: AttachmentType = 'sticker'

  /**
   * Type of the sticker, currently one of `regular`, `mask`, `custom_emoji`.
   *
   * The type of the sticker is independent from its format, which is determined by the fields `is_animated` and `is_video`.
   */
  get type () {
    return this.payload.type
  }

  /** Sticker width */
  get width () {
    return this.payload.width
  }

  /** Sticker height */
  get height () {
    return this.payload.height
  }

  /** `true`, if the sticker is animated */
  isAnimated () {
    return this.payload.is_animated
  }

  /** `true`, if the sticker is a video sticker */
  isVideo () {
    return this.payload.is_video
  }

  /** Sticker thumbnail in the .WEBP or .JPG format */
  get thumb () {
    const { thumb } = this.payload

    if (!thumb) {
      return
    }

    return new PhotoSize(thumb)
  }

  /** Emoji associated with the sticker */
  get emoji () {
    return this.payload.emoji
  }

  /** Name of the sticker set to which the sticker belongs */
  get setName () {
    return this.payload.set_name
  }

  /** Is this sticker a premium one? */
  isPremium (): this is Require<this, 'premiumAnimation'> {
    return this.premiumAnimation !== undefined
  }

  /** Premium animation for the sticker, if the sticker is premium */
  get premiumAnimation () {
    const { premium_animation } = this.payload

    if (!premium_animation) {
      return
    }

    return new File(premium_animation)
  }

  /** For mask stickers, the position where the mask should be placed */
  get maskPosition () {
    const { mask_position } = this.payload

    if (!mask_position) {
      return
    }

    return new MaskPosition(mask_position)
  }

  /** For custom emoji stickers, unique identifier of the custom emoji */
  get customEmojiId () {
    return this.payload.custom_emoji_id
  }

  /** File size */
  get fileSize () {
    return this.payload.file_size
  }

  toJSON (): Interfaces.TelegramSticker {
    return {
      file_id: this.fileId,
      file_unique_id: this.fileUniqueId,
      type: this.type,
      width: this.width,
      height: this.height,
      is_animated: this.isAnimated(),
      is_video: this.isVideo(),
      thumb: this.thumb?.toJSON(),
      emoji: this.emoji,
      set_name: this.setName,
      mask_position: this.maskPosition?.toJSON(),
      custom_emoji_id: this.customEmojiId,
      file_size: this.fileSize
    }
  }
}

inspectable(StickerAttachment, {
  serialize (attachment) {
    return {
      fileId: attachment.fileId,
      fileUniqueId: attachment.fileUniqueId,
      width: attachment.width,
      height: attachment.height,
      isAnimated: attachment.isAnimated(),
      isVideo: attachment.isVideo(),
      thumb: attachment.thumb,
      emoji: attachment.emoji,
      setName: attachment.setName,
      maskPosition: attachment.maskPosition,
      fileSize: attachment.fileSize
    }
  }
})
