import { inspectable } from 'inspectable';

import { Chat } from './chat';
import { User } from './user';
import { ChatInviteLink } from './chat-invite-link';

import { TelegramChatJoinRequest } from '../../telegram-interfaces';

export class ChatJoinRequest {
  public payload: TelegramChatJoinRequest;

  constructor(payload: TelegramChatJoinRequest) {
    this.payload = payload;
  }

  public get [Symbol.toStringTag](): string {
    return this.constructor.name;
  }

  /** Chat to which the request was sent */
  public get chat(): Chat {
    return new Chat(this.payload.chat);
  }

  /** User that sent the join request */
  public get from(): User {
    return new User(this.payload.from);
  }

  /** Date the request was sent in Unix time */
  public get date(): number {
    return this.payload.date;
  }

  /** Bio of the user */
  public get bio(): string | undefined {
    return this.payload.bio;
  }

  /** Chat invite link that was used by the user to send the join request */
  public get inviteLink(): ChatInviteLink | undefined {
    const { invite_link } = this.payload;

    if (!invite_link) return;

    return new ChatInviteLink(invite_link);
  }
}

inspectable(ChatJoinRequest, {
  serialize(request: ChatJoinRequest) {
    return {
      chat: request.chat,
      from: request.from,
      date: request.date,
      bio: request.bio,
      inviteLink: request.inviteLink
    };
  }
});