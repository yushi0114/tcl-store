<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    :isDetail="true"
    title="入库单详情"
    width="60%"
    @ok="closeDrawer"
  >
    <Description @register="registerDesc" class="mt-4" />
  </BasicDrawer>
</template>

<script lang="tsx" setup>
  import { type Recordable } from '@vben/types';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { BasicCopy } from '/@/components/Basic';

  defineOptions({
    name: 'SaleDetailDrawer',
  });

  const props = defineProps<{
    typeOptions: Recordable;
    positionOptions: Recordable;
  }>();
  const schema: DescItem[] = [
    {
      label: '单号',
      field: 'id',
      render(val) {
        return <BasicCopy value={val} />;
      },
    },
    {
      label: '品类',
      field: 'type',
      render(val) {
        return props.typeOptions[val];
      },
    },
    {
      label: '型号',
      field: 'model',
      render(val) {
        return <BasicCopy value={val} />;
      },
    },
    {
      label: '数量',
      field: 'quantity',
    },
    {
      label: '单价',
      field: 'price',
    },
    {
      label: '仓位',
      field: 'position',
      render(val) {
        return props.positionOptions[val];
      },
    },
    {
      label: '入库时间',
      field: 'createTime',
      render(val) {
        return formatToDateTime(val);
      },
    },
    {
      label: '入库人',
      field: 'createBy',
    },
    {
      label: '更新时间',
      field: 'updateTime',
      render(val) {
        return formatToDateTime(val);
      },
    },
    {
      label: '更新人',
      field: 'updateBy',
    },
    {
      label: '备注',
      field: 'remark',
    },
  ];

  const [registerDesc, { setDescProps }] = useDescription({
    data: {},
    schema: schema,
  });

  const [register, { closeDrawer }] = useDrawerInner((data) => {
    setDescProps({
      data,
    });
  });
</script>

<style></style>
