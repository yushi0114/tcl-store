<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { useRequest } from 'vue-request';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './dept.data';

  import { addOuterOrder, updateOuterOrder } from '@/api/store';

  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { runAsync: AddOuterOrder } = useRequest(addOuterOrder);
      const { runAsync: UpdateOuterOrder } = useRequest(updateOuterOrder);
      const isUpdate = ref(true);
      const record: any = ref({});

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        updateSchema([
          {
            field: 'type',
            dynamicDisabled: unref(isUpdate),
          },
          {
            field: 'model',
            dynamicDisabled: unref(isUpdate),
          },
          {
            field: 'quantity',
            dynamicDisabled: unref(isUpdate),
          },
          {
            field: 'position',
            dynamicDisabled: unref(isUpdate),
          },
        ]);

        if (unref(isUpdate)) {
          const _data = { ...data.record };
          setFieldsValue(_data);
          record.value = _data;
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增出库' : '编辑出库'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          unref(isUpdate) && (await UpdateOuterOrder({ id: record.value.id, ...values }));
          !unref(isUpdate) && (await AddOuterOrder(values));
          console.log(values);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
