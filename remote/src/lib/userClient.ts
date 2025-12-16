const DB: Record<string, [string, string]> = {
  '1': ['Alice', 'Алиса'],
  '2': ['Bob', 'Боб'],
  '3': ['Charlie', 'Чарли'],
};
const UNKNOWN_TRANSLATION: [string, string] = ['Unknown', 'Unknown'];

export class UserClient {
  private cache = new Map<string, string>();

  async getUserName(userId: string, lang: string) {
    const cached = this.cache.get(userId);
    if (cached) return cached;

    // детерминированная "I/O"
    await Promise.resolve();
    const translations = DB[userId] ?? UNKNOWN_TRANSLATION;
    const name = lang === 'en' ? translations[0] : translations[1];

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
