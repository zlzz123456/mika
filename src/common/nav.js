import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '用户管理',
        path: 'usermanage',
        icon: 'user',
        children: [
          {
            name: '用户列表',
            path: 'userinfo-list',
            component: dynamicWrapper(app, ['user_list'], () => import('../routes/UserManage/UserInfoList')),
          },
        ],
      },
      {
        name: '订单管理',
        path: 'order',
        icon: 'profile',
        children: [
          {
            name: '借款订单',
            path: 'borrow-order',
            component: dynamicWrapper(app, ['order_borrow'], () => import('../routes/OrderManage/BorrowOrderList')),
          },
          {
            name: '放款订单',
            path: 'loan-order',
            component: dynamicWrapper(app, ['order_loan'], () => import('../routes/OrderManage/LoanOrderList')),
          },
          {
            name: '还款订单',
            path: 'repayment-order',
            component: dynamicWrapper(app, ['order_borrow', 'order_repayment'], () => import('../routes/OrderManage/RepaymentOrderList')),
          },
          // {
          //   name: '其他应付款列表',
          //   path: 'other-payables',
          //   component: dynamicWrapper(app, ['order_other'], () => import('../routes/OrderManage/OtherPayablesList')),
          // },
        ],
      },
      {
        name: '分期产品',
        path: 'staging',
        icon: 'appstore-o',
        children: [
          {
            name: '产品列表',
            path: 'product-list',
            component: dynamicWrapper(app, ['staging_product_list'], () => import('../routes/StagingProduct/ProductList')),
          },
        ],
      },
      {
        name: '额度管理',
        path: 'limit',
        icon: 'red-envelope',
        children: [
          {
            name: '额度管理列表',
            path: 'limit-list',
            component: dynamicWrapper(app, ['user_list', 'limit_list'], () => import('../routes/LimitManage/LimitManageList')),
          },
          {
            name: '额度查询',
            path: 'limit-search',
            component: dynamicWrapper(app, ['user_list', 'limit_list'], () => import('../routes/LimitManage/LimitSearch')),
          },
        ],
      },
      {
        name: '账务管理',
        path: 'accounting',
        icon: 'calculator',
        children: [
          {
            name: '人工入账',
            path: 'manual-entry',
            component: dynamicWrapper(app, [], () => import('../routes/AccountingManage/manualEntry')),
          },
          {
            name: '查账审核',
            path: 'audit-audit',
            component: dynamicWrapper(app, ['audit_confirm'], () => import('../routes/AccountingManage/confirmAudit')),
          },
          {
            name: '减免审核',
            path: 'deduct-audit',
            component: dynamicWrapper(app, [], () => import('../routes/AccountingManage/deductAudit')),
          },
        ],
      },
      {
        name: '路由配置',
        path: 'route',
        icon: 'link',
        children: [
          {
            name: '支付路由',
            path: 'payment-route',
            component: dynamicWrapper(app, [], () => import('../routes/routeManage/routeManage')),
          },
        ],
      },
      {
        name: '信审管理',
        path: 'credit',
        icon: 'red-envelope',
        children: [
          {
            name: '额度审核列表',
            path: 'limit-review',
            component: dynamicWrapper(app, ['user_list', 'credit_limitreviewlist'], () => import('../routes/CreditManage/CreditLimitList')),
          },
          {
            name: '人工复审列表',
            path: 'manual-review',
            component: dynamicWrapper(app, ['user_list', 'credit_manualreview'], () => import('../routes/CreditManage/ManualReview')),
          },
        ],
      },
      {
        name: '系统日志',
        path: 'systemlog',
        icon: 'book',
        children: [
          {
            name: '系统日志查看',
            path: 'systemlog-datajson',
            component: dynamicWrapper(app, ['system_user'], () => import('../routes/SystemLog/SystemLogjson')),
          },
        ],
      },
      {
        name: '系统管理',
        path: 'system',
        icon: 'setting',
        children: [
          {
            name: '系统用户管理',
            path: 'system-user-manage',
            component: dynamicWrapper(app, ['system_user'], () => import('../routes/SystemManage/UserList')),
          },
          {
            name: '系统菜单管理',
            path: 'system-menu',
            component: dynamicWrapper(app, ['system_menu'], () => import('../routes/SystemManage/SystemMenu')),
          },
          {
            name: '系统参数设置',
            path: 'system-params',
            component: dynamicWrapper(app, [], () => import('../routes/SystemManage/SystemParams')),
          },
          {
            name: '数据库参数列表',
            path: 'system-dict',
            component: dynamicWrapper(app, ['system_dict'], () => import('../routes/SystemManage/SystemDictionary')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
        ],
      },
    ],
  },
];
