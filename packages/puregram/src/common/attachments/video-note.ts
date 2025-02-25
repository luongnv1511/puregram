import { inspectable } from 'inspectable'

import * as Interfaces from '../../generated/telegram-interfaces'
import { AttachmentType } from '../../types/types'

import { PhotoSize } from '../structures'

import { FileAttachment } from './file-attachment'

/** This object represents a video message. */
export class VideoNoteAttachment extends FileAttachment<Interfaces.TelegramVideoNote> {
  attachmentType: AttachmentType = 'video_note'

  /**
   * Video width and height (diameter of the video message) as defined by
   * sender
   */
  get length () {
    return this.payload.length
  }

  /** Duration of the video in seconds as defined by sender */
  get duration () {
    return this.payload.duration
  }

  /** Video thumbnail */
  get thumb () {
    const { thumb } = this.payload

    if (!thumb) {
      return
    }

    return new PhotoSize(thumb)
  }

  /** File size */
  get fileSize () {
    return this.payload.file_size
  }

  toJSON (): Interfaces.TelegramVideoNote {
    return {
      file_id: this.fileId,
      file_unique_id: this.fileUniqueId,
      length: this.length,
      duration: this.duration,
      thumb: this.thumb?.toJSON(),
      file_size: this.fileSize
    }
  }
}

inspectable(VideoNoteAttachment, {
  serialize (attachment) {
    return {
      fileId: attachment.fileId,
      fileUniqueId: attachment.fileUniqueId,
      length: attachment.length,
      duration: attachment.duration,
      thumb: attachment.thumb,
      fileSize: attachment.fileSize
    }
  }
})
