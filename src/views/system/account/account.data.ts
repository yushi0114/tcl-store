import { getAllRoleList } from '/@/api/system/system';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    format(text) {
      return formatToDateTime(text);
    },
    width: 180,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 180,
    format(text) {
      return formatToDateTime(text);
    },
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { xxl: 6, xl: 6, lg: 6, md: 12, sm: 24, xs: 24 },
  },
  {
    field: 'realName',
    label: '真实姓名',
    component: 'Input',
    colProps: { xxl: 6, xl: 6, lg: 6, md: 12, sm: 24, xs: 24 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 10,
    },
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
      {
        pattern: /^[a-z A-Z 0-9]{2,10}$/,
        message: '用户名只能输入2-10位大写字母、小写字母或数字',
        trigger: 'blur',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'roles',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      // labelField: 'roleName',
      // valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'realName',
    label: '真实姓名',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 255,
    },
    rules: [{ type: 'email' }],
  },

  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      showCount: true,
      maxlength: 255,
    },
  },
];
