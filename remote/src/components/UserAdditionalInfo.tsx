import { getUserName } from '@/services/userService';

const resolvedNames = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

function readUserName(userId: string, locale: string) {
  const cacheKey = `${userId}:${locale}`;

  if (resolvedNames.has(cacheKey)) {
    const name = resolvedNames.get(cacheKey)!;
    resolvedNames.delete(cacheKey);
    return name;
  }

  let pending = pendingRequests.get(cacheKey);
  if (!pending) {
    pending = getUserName(userId, locale).then((name) => {
      pendingRequests.delete(cacheKey);
      resolvedNames.set(cacheKey, name);
      return name;
    });
    pendingRequests.set(cacheKey, pending);
  }

  throw pending;
}

type UserAdditionalInfoProps = {
  userId: string;
  locale: string;
};

const UserAdditionalInfo = ({ userId, locale }: UserAdditionalInfoProps) => {
  const name = readUserName(userId, locale);

  return (
    <div style={{ border: '1px dashed #666', padding: 12 }}>
      <div>Доп. панель пользователя <b>{userId}</b></div>
      <div>Locale запроса: <b>{locale}</b></div>
      <div>В кеше лежит: <b>{name}</b></div>
    </div>
  );
};

export default UserAdditionalInfo;
