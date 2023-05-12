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

  import { addIncomingOrder, updateIncomingOrder } from '@/api/store';

  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { runAsync: AddIncomingOrder } = useRequest(addIncomingOrder);
      const { runAsync: UpdateIncomingOrder } = useRequest(updateIncomingOrder);
      const isUpdate = ref(true);
      const record: any = ref({});

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        console.log('data: ', data);
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const _data = { ...data.record };
          setFieldsValue(_data);
          record.value = _data;
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增商品' : '编辑商品'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          unref(isUpdate) && (await UpdateIncomingOrder({ id: record.value.id, ...values }));
          !unref(isUpdate) && (await AddIncomingOrder(values));
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
