import { inspectable } from 'inspectable'

import { TelegramEncryptedPassportElement, TelegramPassportFile } from '../../generated/telegram-interfaces'

import { filterPayload } from '../../utils/helpers'

import { PassportFile } from './passport-file'

/**
 * Contains information about documents or other Telegram Passport elements
 * shared with the bot by the user.
 */
export class EncryptedPassportElement {
  constructor(private payload: TelegramEncryptedPassportElement) { }

  get [Symbol.toStringTag]() {
    return this.constructor.name
  }

  /**
   * Element type. One of `personal_details`, `passport`, `driver_license`,
   * `identity_card`, `internal_passport`, `address`, `utility_bill`,
   * `bank_statement`, `rental_agreement`, `passport_registration`,
   * `temporary_registration`, `phone_number`, `email`.
   */
  get type() {
    return this.payload.type
  }

  /**
   * Base64-encoded encrypted Telegram Passport element data provided by th
   * user, available for `personal_details`, `passport`, `driver_license`,
   * `identity_card`, `internal_passport` and `address` types.
   * Can be decrypted and verified using the accompanying
   * `EncryptedCredentials`.
   */
  get data() {
    return this.payload.data
  }

  /** User's verified phone number, available only for `phone_number` type */
  get phoneNumber() {
    return this.payload.phone_number
  }

  /** User's verified email address, available only for `email` type */
  get email() {
    return this.payload.email
  }

  /**
   * Array of encrypted files with documents provided by the user, available
   * for `utility_bill`, `bank_statement`, `rental_agreement`,
   * `passport_registration` and `temporary_registration` types. Files can be
   * decrypted and verified using the accompanying `EncryptedCredentials`.
   */
  get files() {
    const { files } = this.payload

    if (!files) {
      return []
    }

    return files.map(
      (file: TelegramPassportFile) => new PassportFile(file)
    )
  }

  /**
   * Encrypted file with the front side of the document, provided by the user.
   * Available for `passport`, `driver_license`, `identity_card` and
   * `internal_passport`. The file can be decrypted and verified using the
   * accompanying `EncryptedCredentials`.
   */
  get frontSide() {
    const { front_side } = this.payload

    if (!front_side) {
      return
    }

    return new PassportFile(front_side)
  }

  /**
   * Encrypted file with the reverse side of the document, provided by the
   * user. Available for `driver_license` and `identity_card`. The file can be
   * decrypted and verified using the accompanying `EncryptedCredentials`.
   */
  get reverseSide() {
    const { reverse_side } = this.payload

    if (!reverse_side) {
      return
    }

    return new PassportFile(reverse_side)
  }

  /**
   * Encrypted file with the selfie of the user holding a document, provided by
   * the user; available for `passport`, `driver_license`, `identity_card` and
   * `internal_passport`. The file can be decrypted and verified using the
   * accompanying `EncryptedCredentials`.
   */
  get selfie() {
    const { selfie } = this.payload

    if (!selfie) {
      return
    }

    return new PassportFile(selfie)
  }

  /**
   * Array of encrypted files with translated versions of documents provided by
   * the user. Available if requested for `passport`, `driver_license`,
   * `identity_card`, `internal_passport`, `utility_bill`, `bank_statement`,
   * `rental_agreement`, `passport_registration` and `temporary_registration`
   * types. Files can be decrypted and verified using the accompanying
   * `EncryptedCredentials`.
   */
  get translation() {
    const { translation } = this.payload

    if (!translation) {
      return []
    }

    return translation.map(
      (element: TelegramPassportFile) => new PassportFile(element)
    )
  }

  /**
   * Base64-encoded element hash for using in `PassportElementErrorUnspecified`
   */
  get hash() {
    return this.payload.hash
  }
}

inspectable(EncryptedPassportElement, {
  serialize(element: EncryptedPassportElement) {
    const payload = {
      type: element.type,
      data: element.data,
      phoneNumber: element.phoneNumber,
      email: element.email,
      files: element.files,
      frontSide: element.frontSide,
      reverseSide: element.reverseSide,
      selfie: element.selfie,
      translation: element.translation,
      hash: element.hash
    }

    return filterPayload(payload)
  }
})
