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

  async getUserName(userId: string, lang: string) {
    const cached = this.cache.get(userId);
    if (cached) return cached;

    let pending = this.pending.get(userId);
    if (!pending) {
      pending = this.loadUserName(userId, lang).then((name) => {
        this.pending.delete(userId);
        this.cache.set(userId, name);
        return name;
      });
      this.pending.set(userId, pending);
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
