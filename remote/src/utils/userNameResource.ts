import type { UserClient } from '@/lib/userClient';
import { getUserName } from '@/services/userService';

// WeakMap позволяет хранить кеш в привязке к конкретному клиенту запроса.
const resolvedNames = new WeakMap<UserClient, Map<string, string>>();
const pendingRequests = new WeakMap<
  UserClient,
  Map<string, Promise<string>>
>();

function getResolvedMap(client: UserClient) {
  let cache = resolvedNames.get(client);
  if (!cache) {
    cache = new Map();
    resolvedNames.set(client, cache);
  }
  return cache;
}

function getPendingMap(client: UserClient) {
  let cache = pendingRequests.get(client);
  if (!cache) {
    cache = new Map();
    pendingRequests.set(client, cache);
  }
  return cache;
}

export function readUserName(
  client: UserClient,
  userId: string,
  locale: string,
) {
  // Suspense-совместный ресурс: отдаёт значение или бросает Promise загрузки.
  const cacheKey = `${userId}:${locale}`;
  const resolvedMap = getResolvedMap(client);
  const pendingMap = getPendingMap(client);

  if (resolvedMap.has(cacheKey)) {
    return resolvedMap.get(cacheKey)!;
  }

  let pending = pendingMap.get(cacheKey);
  if (!pending) {
    pending = getUserName(client, userId, locale).then((name) => {
      pendingMap.delete(cacheKey);
      resolvedMap.set(cacheKey, name);
      return name;
    });
    pendingMap.set(cacheKey, pending);
  }

  throw pending;
}
