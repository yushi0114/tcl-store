import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';
import { getPositionOptions, getTypeOptions } from '/@/api/store';

export const columns: BasicColumn[] = [
  {
    title: '单号',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: '品类',
    dataIndex: 'type',
    width: 160,
  },
  {
    title: '型号',
    dataIndex: 'model',
    width: 100,
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    width: 80,
  },
  {
    title: '单价',
    dataIndex: 'price',
    width: 150,
  },
  {
    title: '仓位',
    dataIndex: 'position',
    width: 180,
  },
  {
    title: '入库时间',
    dataIndex: 'createTime',
    format(text) {
      return formatToDateTime(text);
    },
    width: 180,
  },
  {
    title: '入库人',
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
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '单号',
    component: 'Input',
    componentProps: {},
    colProps: { xxl: 6, xl: 6, lg: 6, md: 12, sm: 24, xs: 24 },
  },
  {
    field: 'type',
    label: '品类',
    component: 'ApiSelect',
    componentProps: {
      api: getTypeOptions,
    },
    colProps: { xxl: 6, xl: 6, lg: 6, md: 12, sm: 24, xs: 24 },
  },
  {
    field: 'model',
    label: '型号',
    component: 'Input',
    componentProps: {},
    colProps: { xxl: 6, xl: 6, lg: 6, md: 12, sm: 24, xs: 24 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '品类',
    component: 'ApiSelect',
    componentProps: {
      api: getTypeOptions,
    },
    required: true,
  },
  {
    field: 'model',
    label: '型号',
    component: 'Input',
    required: true,
  },
  {
    field: 'quantity',
    label: '数量',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 100000,
      step: 100,
    },
    required: true,
  },
  {
    field: 'price',
    label: '单价',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 100000,
      step: 100,
      parser: (value) => value.replace(/￥\s?|(,*)/g, ''),
      formatter: (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      precision: 2,
    },
    required: true,
  },
  {
    field: 'position',
    label: '仓位',
    component: 'ApiSelect',
    componentProps: {
      api: getPositionOptions,
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      showCount: true,
      maxlength: 255,
    },
  },
];
