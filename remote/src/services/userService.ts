import { userClient } from '../lib/userClient';

export async function getUserName(userId: string) {
  return userClient.getUserName(userId);
}
