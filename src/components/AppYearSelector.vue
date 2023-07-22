<template>
  <input
    data-component-name="AppYearSelector"
    type="number"
    :value="props.value"
    min="100"
    max="2100"
    placeholder="Pick an year"
    step="1"
    @change="changeHandler"
  >
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number,
  }>(),
  {
    value: new Date().getFullYear()
  }
)

const emits = defineEmits<{
  change: [value: number]
}>();

const changeHandler = ({ target }: Event) => emits(
  'change',
  Number((target as HTMLInputElement).value)
)
</script>

<style scoped lang="scss">
[data-component-name="AppYearSelector"] {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 14px;

  width: 100%;

  font-size: 1rem;

  & {
    -moz-appearance: textfield;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
}
</style>
