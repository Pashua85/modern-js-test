const DB: Record<string, string> = {
  '1': 'Alice',
  '2': 'Bob',
  '3': 'Charlie',
};

export class UserClient {
  private cache = new Map<string, string>();

  async getUserName(userId: string) {
    const cached = this.cache.get(userId);
    if (cached) return cached;

    // детерминированная "I/O"
    await Promise.resolve();
    const name = DB[userId] ?? 'Unknown';

    // ❌ BUG: cache на singleton живёт между SSR-запросами
    this.cache.set(userId, name);
    return name;
  }
}

export function peekCache(userId: string) {
  // для отладки/демо
  return (userClient as any).cache?.get?.(userId);
}

// ❌ BUG ROOT: singleton на процесс
export const userClient = new UserClient();
