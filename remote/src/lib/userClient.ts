const DB: Record<string, [string, string]> = {
  '1': ['Alice', 'Алиса'],
  '2': ['Bob', 'Боб'],
  '3': ['Charlie', 'Чарли'],
};
const UNKNOWN_TRANSLATION: [string, string] = ['Unknown', 'Unknown'];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class UserClient {
  private cache = new Map<string, string>();
  private pending = new Map<string, Promise<string>>();

  private key(userId: string, lang: string) {
    return `${userId}:${lang}`;
  }

  async getUserName(userId: string, lang: string) {
    const cacheKey = this.key(userId, lang);
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    let pending = this.pending.get(cacheKey);
    if (!pending) {
      pending = this.loadUserName(userId, lang).then((name) => {
        this.pending.delete(cacheKey);
        this.cache.set(cacheKey, name);
        return name;
      });
      this.pending.set(cacheKey, pending);
    }

    return pending;
  }

  private async loadUserName(userId: string, lang: string) {
    // эмулируем медленную I/O для наглядного кеширования
    await delay(2000);
    const translations = DB[userId] ?? UNKNOWN_TRANSLATION;
    return lang === 'en' ? translations[0] : translations[1];
  }
}

export const userClient = new UserClient();
