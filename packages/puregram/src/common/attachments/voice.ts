import { inspectable } from 'inspectable';

import { FileAttachment } from './file-attachment';

import { TelegramVoice } from '../../telegram-interfaces';

/** This object represents a voice note. */
export class VoiceAttachment extends FileAttachment<TelegramVoice> {
  public attachmentType: 'voice' = 'voice';

  /** Duration of the audio in seconds as defined by sender */
  public get duration(): number {
    return this.payload.duration;
  }

  /** MIME type of the file as defined by sender */
  public get mimeType(): string | undefined {
    return this.payload.mime_type;
  }

  /** File size */
  public get fileSize(): number | undefined {
    return this.payload.file_size;
  }
}

inspectable(VoiceAttachment, {
  serialize(voice: VoiceAttachment) {
    return {
      fileId: voice.fileId,
      fileUniqueId: voice.fileUniqueId,
      duration: voice.duration,
      mimeType: voice.mimeType,
      fileSize: voice.fileSize
    };
  }
});
