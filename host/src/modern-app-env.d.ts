/// <reference types='@modern-js/app-tools/types' />
/// <reference types='@modern-js/runtime/types' />
/// <reference types='@modern-js/runtime/types/router' />

declare module 'remote/UserInfo' {
  import type { ComponentType } from 'react';

  const UserInfo: ComponentType<{
    userId?: string;
  }>;

  export default UserInfo;
}
