import { userClient } from '../lib/userClient';

export async function getUserName(userId: string, lang: string) {
  return userClient.getUserName(userId, lang);
}
