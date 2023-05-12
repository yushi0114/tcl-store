import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '仓位名称',
    dataIndex: 'label',
    width: 160,
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
    title: '描述',
    dataIndex: 'description',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'label',
    label: '仓位名称',
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 255,
    },
    required: true,
  },
  {
    label: '描述',
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      showCount: true,
      maxlength: 255,
    },
  },
];
