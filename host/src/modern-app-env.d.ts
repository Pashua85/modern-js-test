/// <reference types='@modern-js/app-tools/types' />
/// <reference types='@modern-js/runtime/types' />
/// <reference types='@modern-js/runtime/types/router' />

declare module 'remote/UserName' {
  import type { ComponentType } from 'react';

  const UserName: ComponentType<{
    userId: string;
    locale: string;
    showAdditional?: boolean;
  }>;

  export default UserName;
}
