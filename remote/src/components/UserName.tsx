import { peekCache } from '@/lib/userClient';
import { getUserName } from '@/services/userService';
import { Typography } from '@mui/material';

const resolvedNames = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

function readUserName(userId: string) {
  if (resolvedNames.has(userId)) {
    const name = resolvedNames.get(userId)!;
    resolvedNames.delete(userId);
    return name;
  }

  let pending = pendingRequests.get(userId);
  if (!pending) {
    pending = getUserName(userId).then((name) => {
      pendingRequests.delete(userId);
      resolvedNames.set(userId, name);
      return name;
    });
    pendingRequests.set(userId, pending);
  }

  throw pending;
}

type UserNameProps = {
  userId: string;
};

const UserName = ({ userId }: UserNameProps) => {
  const name = readUserName(userId);

  return (
    <div style={{ border: '1px solid #ccc', padding: 12 }}>
      <div>Requested userId: <b>{userId}</b></div>
      <div>Resolved name: <b>{name}</b></div>
      <div style={{ opacity: 0.7 }}>
        Cache peek for this userId: {String(peekCache(userId))}
      </div>
    </div>
  );
};

export default UserName;
