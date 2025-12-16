import { createContext, useContext } from 'react';
import type { UserClient } from '@/lib/userClient';

// Контекст, который хранит UserClient в рамках одного SSR/CSR-рендера.
const UserClientContext = createContext<UserClient | null>(null);

export const UserClientProviderContext = UserClientContext.Provider;

export function useUserClient() {
  const client = useContext(UserClientContext);
  if (!client) {
    throw new Error(
      'UserClientContext is missing. Wrap tree with <UserClientProvider>.',
    );
  }
  return client;
}

// Хелпер, гарантирующий, что consumer всегда получает клиент или падает.
export default UserClientContext;
