<template>
  <Tooltip :class="getClass">
    <template #title> 点击一键复制文本 </template>
    <span
      :class="['cursor-pointer', isSupported && 'hover:bg-[rgba(0,132,255,.08)]']"
      @click="handleCopy"
      >{{ value }}</span
    >
  </Tooltip>
</template>
<script lang="ts" setup>
  import { unref, computed } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useClipboard } from '@vueuse/core';

  const props = defineProps({
    /**
     * 复制的值
     * @default: ''
     */
    value: { type: String, default: '' },
  });

  const { createMessage } = useMessage();

  const { text, copy, copied, isSupported } = useClipboard({ source: props.value, legacy: true });

  const { prefixCls } = useDesign('basic-copy');
  const getClass = computed(() => [prefixCls]);

  const handleCopy = () => {
    if (!isSupported.value) {
      return;
    }
    copy(props.value);
    console.log('isSupported: ', isSupported.value, copied.value, text.value);

    if (unref(copied)) {
      createMessage.destroy();
      createMessage.success('复制成功');
    }
  };
</script>
