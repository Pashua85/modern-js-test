const DB: Record<string, [string, string]> = {
  '1': ['Alice', 'Алиса'],
  '2': ['Bob', 'Боб'],
  '3': ['Charlie', 'Чарли'],
};
const UNKNOWN_TRANSLATION: [string, string] = ['Unknown', 'Unknown'];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class UserClient {
  private cache = new Map<string, string>();

  async getUserName(userId: string, lang: string) {
    const cached = this.cache.get(userId);
    if (cached) return cached;

    // эмулируем медленную I/O для наглядного кеширования
    await delay(2000);
    const translations = DB[userId] ?? UNKNOWN_TRANSLATION;
    const name = lang === 'en' ? translations[0] : translations[1];

    // ❌ BUG: cache на singleton живёт между SSR-запросами
    this.cache.set(userId, name);
    return name;
  }
}

// ❌ BUG ROOT: singleton на процесс
export const userClient = new UserClient();
