import type { UserClient } from '../lib/userClient';

export async function getUserName(
  client: UserClient,
  userId: string,
  lang: string,
) {
  return client.getUserName(userId, lang);
}

export function peekUserName(
  client: UserClient,
  userId: string,
  lang: string,
) {
  return client.peekUserName(userId, lang);
}
