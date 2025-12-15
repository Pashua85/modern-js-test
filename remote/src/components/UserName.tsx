import { peekCache } from '@/lib/userClient';
import { getUserName } from '@/services/userService';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type UserNameProps = {
  userId: string;
};

const UserName = ({ userId }: UserNameProps) => { 
  const [name, setName] = useState<string>('(loading...)');

  useEffect(() => {
    let alive = true;
    getUserName(userId).then((n) => {
      if (alive) setName(n);
    });
    return () => {
      alive = false;
    };
  }, [userId]);
  
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
