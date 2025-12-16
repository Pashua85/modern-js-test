import type { UserClient } from '@/lib/userClient';
import { getUserName, peekUserName } from '@/services/userService';

export function readUserName(
  client: UserClient,
  userId: string,
  locale: string,
) {
  const cached = peekUserName(client, userId, locale);
  if (cached !== undefined) {
    return cached;
  }

  // Suspense-паттерн: бросаем Promise, пока client не закэширует результат.
  throw getUserName(client, userId, locale);
}
