import { TelegramFile } from '../interfaces';

export interface GetFileParams {
  /** File identifier to get info about */
  file_id: string;

  [key: string]: any;
}

/**
 * Use this method to get basic info about a file and prepare it for
 * downloading. For the moment, bots can download files of up to 20MB in size.
 *
 * On success, a `File` object is returned.
 *
 * The file can then be downloaded via the link
 * `https://api.telegram.org/file/bot<token>/<file_path>`,
 * where `<file_path>` is taken from the response.
 *
 * It is guaranteed that the link will be valid for at least **1 hour**.
 * When the link expires, a new one can be requested by calling getFile again.
 */
export type getFile = (params: GetFileParams) => Promise<TelegramFile>;
