export type UserInfoProps = {
  userId?: string;
};

const UserInfo = ({ userId }: UserInfoProps) => (
  <section
    style={{
      padding: '1rem',
      border: '1px solid #e5e5e5',
      borderRadius: '0.75rem',
      background: '#f7fafc',
    }}
  >
    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Remote UserInfo</p>
    <p style={{ margin: 0 }}>
      Это удаленный компонент, подключенный через module federation.{' '}
      {userId ? `ID пользователя: ${userId}` : 'ID пока не передан.'}
    </p>
  </section>
);

export default UserInfo;
