import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from '@modern-js/runtime/router';

type RemoteUserInfoComponent = ComponentType<{
  userId?: string;
}>;

const UsersPage = () => {
  const params = useParams<{ id?: string }>();
  const [RemoteUserInfo, setRemoteUserInfo] =
    useState<RemoteUserInfoComponent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    import('remote/UserInfo')
      .then((module) => {
        if (!cancelled) {
          setRemoteUserInfo(() => module.default);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError('Не удалось загрузить компонент из remote приложения.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const userId = params?.id ?? 'unknown';

  return (
    <section style={{ padding: '2rem' }}>
      <p style={{ marginBottom: '1rem' }}>
        <Link to="/">← Вернуться на главную</Link>
      </p>
      <h1 style={{ marginBottom: '1.5rem' }}>Профиль пользователя {userId}</h1>
      {RemoteUserInfo && <RemoteUserInfo userId={userId} />}
      {!RemoteUserInfo && !loadError && (
        <p>Загружаем UserInfo из remote приложения...</p>
      )}
      {loadError && (
        <p role="alert" style={{ color: '#c53030' }}>
          {loadError}
        </p>
      )}
    </section>
  );
};

export default UsersPage;
