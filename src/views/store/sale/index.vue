<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          v-auth="[RoleEnum.SUPER, RoleEnum.MANAGER, RoleEnum.OUTER]"
          @click="handleCreate"
        >
          新增销售单
        </a-button>
        <a-button v-auth="[RoleEnum.SUPER, RoleEnum.MANAGER, RoleEnum.OUTER]" @click="handleExport">
          导出
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span
            class="cursor-pointer text-blue"
            :title="record[column.key]"
            @click="openDrawerDrawer(true, record)"
          >
            {{ record[column.key] }}
          </span>
        </template>
        <template v-if="column.key === 'type'">
          {{
            typeOptions ? typeOptions[record[column.key]] ?? record[column.key] : record[column.key]
          }}
        </template>
        <template v-if="column.key === 'position'">
          {{ positionOptions ? positionOptions[record[column.key]] : record[column.key] }}
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑销售单',
                onClick: handleEdit.bind(null, record),
                auth: [RoleEnum.SUPER, RoleEnum.MANAGER, RoleEnum.OUTER],
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此销售单',
                popConfirm: {
                  title: '是否确认删除?删除订单后将不可恢复，请谨慎删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
                auth: [RoleEnum.SUPER, RoleEnum.MANAGER],
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
    <SaleDetailDrawer
      :typeOptions="typeOptions"
      :positionOptions="positionOptions"
      @register="registerDrawer"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { type Recordable } from '@vben/types';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import SaleDetailDrawer from './SaleDetailDrawer.vue';

  import {
    getSaleOrderPage,
    deleteSaleOrder,
    getPositionOptions,
    getTypeOptions,
    exportSaleOrder,
  } from '@/api/store';

  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import DeptModal from './DeptModal.vue';

  import { columns, searchFormSchema } from './dept.data';
  import { useRequest } from 'vue-request';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { downloadByData } from '@/utils/file/download';

  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, DeptModal, TableAction, PageWrapper, SaleDetailDrawer },
    setup() {
      const { data: positionOptions } = useRequest(() => getPositionOptions({ isMap: true }), {
        manual: false,
        initialData: {},
      });
      const { data: typeOptions } = useRequest(() => getTypeOptions({ isMap: true }), {
        manual: false,
        initialData: {},
        cacheKey: 'type',
        cacheTime: 60 * 60 * 24 * 7,
      });
      const { run: ExportSaleOrder } = useRequest(exportSaleOrder, {
        onSuccess(data) {
          downloadByData(data, '销售单.xlsx');
        },
      });
      const { run: DeleteIncomingOrder } = useRequest(deleteSaleOrder, {
        onSuccess() {
          reload();
        },
        onError(error) {
          console.log('error: ', error);
          setLoading(false);
        },
      });
      const [registerModal, { openModal }] = useModal();
      const [registerDrawer, { openDrawer: openDrawerDrawer }] = useDrawer();
      const [registerTable, { reload, setLoading, getForm }] = useTable({
        title: '销售单列表',
        api: getSaleOrderPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
        setLoading(true);
        DeleteIncomingOrder({ id: record.id });
      }

      function handleSuccess() {
        reload();
      }

      function handleExport() {
        const { getFieldsValue } = getForm();
        ExportSaleOrder(getFieldsValue() as any);
      }

      return {
        registerTable,
        registerModal,
        registerDrawer,
        openDrawerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleExport,
        positionOptions,
        typeOptions,
        RoleEnum,
      };
    },
  });
</script>
