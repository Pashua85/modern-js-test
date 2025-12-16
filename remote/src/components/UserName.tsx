import { peekCache } from '@/lib/userClient';
import { getUserName } from '@/services/userService';
import { Typography } from '@mui/material';

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

type UserNameProps = {
  userId: string;
  locale: string;
};

const UserName = ({ userId, locale }: UserNameProps) => {
  const name = readUserName(userId, locale);

  return (
    <div style={{ border: '1px solid #ccc', padding: 12 }}>
      <div>Requested userId: <b>{userId}</b></div>
      <div>Requested locale: <b>{locale}</b></div>
      <div>Resolved name: <b>{name}</b></div>
      <div style={{ opacity: 0.7 }}>
        Cache peek for this userId: {String(peekCache(userId))}
      </div>
    </div>
  );
};

export default UserName;
