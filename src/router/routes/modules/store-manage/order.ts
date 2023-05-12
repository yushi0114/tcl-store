import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const store: AppRouteModule = {
  path: '/store',
  name: 'Store',
  component: LAYOUT,
  redirect: '/store/income-order',
  meta: {
    orderNo: 2000,
    icon: 'mdi:store',
    title: t('routes.store.order.moduleName'),
  },
  children: [
    {
      path: 'incoming-order',
      name: 'IncomingOrder',
      meta: {
        title: t('routes.store.order.income'),
        icon: 'mdi:store-plus',
        ignoreKeepAlive: false,
        // roles: [RoleEnum.SUPER, RoleEnum.INCOME, RoleEnum.MANAGER],
      },
      component: () => import('@/views/store/income/index.vue'),
    },
    {
      path: 'outer-order',
      name: 'OuterOrder',
      meta: {
        title: t('routes.store.order.outer'),
        icon: 'mdi:store-remove',
        ignoreKeepAlive: true,
        // roles: [RoleEnum.SUPER, RoleEnum.OUTER, RoleEnum.MANAGER],
      },
      component: () => import('@/views/store/outer/index.vue'),
    },
    {
      path: 'sale-order',
      name: 'SaleOrder',
      meta: {
        title: t('routes.store.order.saleRecord'),
        icon: 'mdi:store-search',
        ignoreKeepAlive: true,
        // roles: [RoleEnum.SUPER, RoleEnum.OUTER, RoleEnum.MANAGER],
      },
      component: () => import('@/views/store/sale/index.vue'),
    },
    {
      path: 'position',
      name: 'Position',
      meta: {
        title: t('routes.store.order.position'),
        icon: 'fluent:position-to-back-20-filled',
        ignoreKeepAlive: true,
        roles: [RoleEnum.SUPER, RoleEnum.MANAGER],
      },
      component: () => import('@/views/store/position/index.vue'),
    },
  ],
};

export default store;
