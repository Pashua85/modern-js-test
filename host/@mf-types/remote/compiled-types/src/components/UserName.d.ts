type UserNameProps = {
    userId: string;
    locale: string;
    showAdditional?: boolean;
};
declare const UserName: ({ userId, locale, showAdditional }: UserNameProps) => import("react").JSX.Element;
export default UserName;
