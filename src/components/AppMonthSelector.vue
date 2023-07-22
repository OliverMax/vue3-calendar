<template>
  <BaseDropdown
    data-component-name='AppMonthSelector'
    :modelValue="props.value"
    :options="props.monthsNames"
    @update:modelValue="updateHandler"
  />
</template>

<script setup lang='ts'>
import BaseDropdown from '@/components/BaseDropdown.vue'

const props = withDefaults(
  defineProps<{
    value: any
    monthsNames?: string[]
  }>(),
  {
    value: null,
    monthsNames: () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }
);

const emits = defineEmits<{ change: [value: any] }>()

const updateHandler = (value: number) => emits('change', value)
</script>
