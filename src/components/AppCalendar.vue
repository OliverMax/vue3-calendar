<template>
  <div data-component-name='AppCalendar'>
    <div class='header'>
      <slot name='header' />
    </div>

    <ul class='calendar'>
      <li
        v-for='day in days'
        :key='day.formatted.full'
        :class="{
          'day-in-active-month': month === day.pure.month,
          'selected-day':
            year === day.pure.year &&
            month === day.pure.month &&
            date === day.pure.date,
          weekend: [0, 6].includes(day.pure.day),
        }"
        @click='dayClickHandler(day.pure.full)'
      >
        <slot name='day' :day='day.formatted.date'>
          {{ day.formatted.date }}
        </slot>
      </li>
    </ul>

    <div class='footer'>
      <slot name='footer' />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import formatDate from '@/utils/formatDate'
import type { CalendarDay } from '@/types'

const props = withDefaults(defineProps<{ date: Date }>(), { date: () => new Date() })
const emits = defineEmits<{ 'update:date': [date: Date] }>()

const year = computed(() => props.date.getFullYear())
const month = computed(() => props.date.getMonth())
const date = computed(() => props.date.getDate())

const monthStarts = computed(() => new Date(year.value, month.value, 1))
const monthEnds = computed(() => new Date(year.value, month.value + 1, 0))
const daysInMonth = computed(() => monthEnds.value.getDate())

const weeks = computed(
  () => (monthStarts.value.getDay() - 1 + daysInMonth.value + (7 - monthEnds.value.getDay())) / 7
)

const days = computed(() => {
  const res: CalendarDay[] = []

  for (let i = 1; i <= weeks.value * 7; i++) {
    const pureFull = new Date(year.value, month.value, i + 1 - monthStarts.value.getDay())

    const pureDate = pureFull.getDate()
    const pureMonth = pureFull.getMonth()
    const pureYear = pureFull.getFullYear()

    res.push({
      pure: {
        day: pureFull.getDay(),
        date: pureDate,
        month: pureMonth,
        year: pureYear,
        full: pureFull
      },
      formatted: formatDate(pureDate, pureMonth, pureYear)
    })
  }

  return res
})

const dayClickHandler = (date: Date) => emits('update:date', date)
</script>

<style scoped lang='scss'>
[data-component-name='AppCalendar'] {
  width: min-content;

  border-radius: 0.5rem;
  box-shadow: 0 0 0.375rem #9f9f9f;

  padding: 1rem;

  background-color: #fff;

  ul.calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(v-bind(weeks), 1fr);

    gap: 6px;

    li {
      $size: 2.1875rem;

      width: $size;
      height: $size;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 0.5rem;

      background-color: transparent;
      transition: background-color 0.15s ease;

      cursor: pointer;

      user-select: none;

      color: #999;

      &:hover {
        background-color: rgba(204, 204, 204, 0.6);
      }

      &.day-in-active-month {
        color: #000;
      }

      &.selected-day {
        background-color: rgba(0, 151, 255, 0.45);
      }

      &.day-in-active-month.weekend {
        color: red;
      }
    }
  }
}
</style>
