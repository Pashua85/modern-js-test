type UserNameProps = {
  userId?: string;
};

const UserName = ({ userId }: UserNameProps) => (
  <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
    Пользователь {userId ?? 'без ID'}
  </p>
);

export default UserName;
