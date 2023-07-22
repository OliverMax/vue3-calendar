<template>
  <div
    data-component-name='BaseDropdown'
    v-click-outside='clickOutsideHandler'
    @click='onClick'
  >
    <span>{{ activeOption }}</span>

    <ul v-if='isOpened'>
      <li
        v-for='(option, index) of props.options'
        :key='option'
        :class='{ active: option === activeOption }'
        ref='itemRefs'
        @click='onSelectOption(index)'
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number,
    options?: any[]
  }>(),
  {
    modelValue: 0,
    options: () => []
  }
)

const emits = defineEmits<{ 'update:modelValue': [value: number] }>()

const activeOption = computed(() => props.options[props.modelValue])

const isOpened = ref(false)

const onSelectOption = (index: number) => emits('update:modelValue', index);

const onClick = () => (isOpened.value = !isOpened.value)

const clickOutsideHandler = () => {
  if (isOpened.value) {
    isOpened.value = false;
  }
};

const itemRefs = ref([])

// FIXME
watch(isOpened, value => {
  if (value) {
    nextTick(() => itemRefs.value
      .find(item => item.classList.contains('active'))
      .scrollIntoView({ block: 'center' })
    )
  }
})
</script>

<style scoped lang='scss'>
@import "@/styles/scss/mixins";

div {
  position: relative;

  cursor: pointer;

  span {
    width: 100%;
    border: 1px solid #ccc;
    padding: 8px 14px;
    border-radius: 8px;
    user-select: none;
  }

  ul {
    position: absolute;
    bottom: -6px;
    transform: translateY(100%);

    width: 100%;

    background-color: #fff;

    border-radius: 8px 3px 3px 8px;

    max-height: 175px;
    overflow-y: auto;

    @include customScrollBar;
    box-shadow: 0 0 6px #9f9f9f;

    li {
      padding: 8px 14px;
      transition: background-color 0.15s ease;


      &.active {
        background-color: rgba(0, 151, 255, 0.45);
      }

      &:hover {
        background-color: #ccc;
      }
    }
  }
}
</style>
