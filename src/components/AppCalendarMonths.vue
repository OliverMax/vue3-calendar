<template>
  <div
    data-component-name='AppCalendarMonths'
    @click='onClick'
  >
    <span>{{ activeMonthName }}</span>

    <ul v-if='isOpened'>
      <li
        v-for='(monthsItem, index) of props.monthsList'
        :key='monthsItem'
        :class='{ active: monthsItem === activeMonthName }'
        ref='itemRefs'
        @click='onMonthClick(index)'
      >
        {{ monthsItem }}
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    date: Date,
    monthsList?: string[]
  }>(),
  {
    date: () => new Date(),
    monthsList: () => [
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
)

const emits = defineEmits<{ 'update:date': [date: Date] }>()

const activeMonthName = computed(() => props.monthsList[props.date.getMonth()])

const isOpened = ref(false)

const onMonthClick = (idx: number) => emits(
  'update:date',
  new Date(new Date(Number(props.date)).setMonth(idx))
)

const onClick = () => (isOpened.value = !isOpened.value)

const itemRefs = ref([])

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

[data-component-name='AppCalendarMonths'] {
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
