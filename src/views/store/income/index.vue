<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          v-auth="[RoleEnum.SUPER, RoleEnum.MANAGER, RoleEnum.INCOME]"
          @click="handleCreate"
        >
          入库
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
                tooltip: '编辑入库单',
                onClick: handleEdit.bind(null, record),
                auth: [RoleEnum.SUPER, RoleEnum.MANAGER, RoleEnum.INCOME],
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此入库单',
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
    <IncomeDetailDrawer
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
  import {
    getIncomingOrderPage,
    deleteIncomingOrder,
    getPositionOptions,
    getTypeOptions,
  } from '@/api/store';

  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import DeptModal from './DeptModal.vue';

  import { columns, searchFormSchema } from './dept.data';
  import { useRequest } from 'vue-request';
  import { RoleEnum } from '/@/enums/roleEnum';
  import IncomeDetailDrawer from './IncomeDetailDrawer.vue';

  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, DeptModal, TableAction, PageWrapper, IncomeDetailDrawer },
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
      const { run: DeleteIncomingOrder } = useRequest(deleteIncomingOrder, {
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
      const [registerTable, { reload, setLoading }] = useTable({
        title: '入库列表',
        api: getIncomingOrderPage,
        columns,
        formConfig: {
          labelWidth: 100,
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

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        registerDrawer,
        openDrawerDrawer,
        positionOptions,
        typeOptions,
        RoleEnum,
      };
    },
  });
</script>
