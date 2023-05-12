import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const system: AppRouteModule = {
  path: '/system',
  name: 'system',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 1000,
    icon: 'ion:settings-outline',
    title: t('routes.system.moduleName'),
  },
  children: [
    {
      path: 'account',
      name: 'Account',
      meta: {
        title: t('routes.system.account'),
        icon: 'ant-design:user-outlined',
        ignoreKeepAlive: false,
        roles: [RoleEnum.SUPER],
      },
      component: () => import('@/views/system/account/index.vue'),
    },
    {
      path: 'password',
      name: 'Password',
      meta: {
        title: t('routes.system.password'),
        icon: 'mdi:password',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/password/index.vue'),
    },
  ],
};

export default system;
