import { Suspense, lazy } from 'react';
import { Link, useParams } from '@modern-js/runtime/router';

const RemoteUserName = lazy(() => import('remote/UserName'));

const UsersPage = () => {
  const params = useParams<{ id?: string }>();
  const userId = params?.id ?? 'unknown';

  return (
    <section style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Профиль пользователя {userId}</h1>
      <Suspense fallback={<p>Загружаем данные пользователя...</p>}>
        <RemoteUserName userId={userId} />
      </Suspense>
    </section>
  );
};

export default UsersPage;
