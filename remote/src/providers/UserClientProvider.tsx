import { ReactNode, useRef } from 'react';
import {
  UserClientProviderContext,
} from '@/context/UserClientContext';
import { createUserClient, UserClient } from '@/lib/userClient';

type UserClientProviderProps = {
  children: ReactNode;
  client?: UserClient;
};

// Провайдер создаёт UserClient на запрос и реиспользует его внутри дерева.
const UserClientProvider = ({ children, client }: UserClientProviderProps) => {
  const clientRef = useRef<UserClient | null>(client ?? null);

  if (!clientRef.current) {
    // Лениво создаём клиент, чтобы не плодить экземпляры.
    clientRef.current = createUserClient();
  }

  return (
    <UserClientProviderContext value={clientRef.current}>
      {children}
    </UserClientProviderContext>
  );
};

export default UserClientProvider;
