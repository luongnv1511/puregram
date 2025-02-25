import { inspectable } from 'inspectable'

import * as Interfaces from '../../generated/telegram-interfaces'

/** Force reply keyboard */
export class ForceReply {
  private isSelective = false
  private placeholder?: string

  /** Use this parameter if you want to show the keyboard to specific users only */
  selective (selective = true) {
    this.isSelective = selective

    return this
  }

  /** The placeholder to be shown in the input field when the keyboard is active */
  setPlaceholder (placeholder: string) {
    this.placeholder = placeholder

    return this
  }

  /** Returns JSON which is compatible with Telegram's `ForceReply` interface */
  toJSON (): Interfaces.TelegramForceReply {
    return {
      force_reply: true,
      input_field_placeholder: this.placeholder,
      selective: this.isSelective
    }
  }

  toString () {
    return JSON.stringify(this)
  }
}

inspectable(ForceReply, {
  serialize (keyboard) {
    return keyboard.toJSON()
  }
})
