/// <reference types='@modern-js/app-tools/types' />
/// <reference types='@modern-js/runtime/types' />
/// <reference types='@modern-js/runtime/types/router' />

declare module 'remote/UserName' {
  import type { ComponentType } from 'react';

  const UserName: ComponentType<{
    userId: string;
    locale: string;
  }>;

  export default UserName;
}

declare module 'remote/UserAdditionalInfo' {
  import type { ComponentType } from 'react';

  const UserAdditionalInfo: ComponentType<{
    userId: string;
    locale: string;
  }>;

  export default UserAdditionalInfo;
}

declare module 'remote/UserClientProvider' {
  import type { ComponentType, ReactNode } from 'react';

  const UserClientProvider: ComponentType<{
    children: ReactNode;
  }>;

  export default UserClientProvider;
}
