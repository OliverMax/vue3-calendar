<template>
  <div data-component-name='AppMonth'>
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
          weekend: day.formatted.day > 4, // index for Friday
        }"
        @click='dayClickHandler(day.pure.full)'
      >
        <slot name='day' :day='day.formatted.date'>
          {{ day.formatted.date }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
// TODO: week ca starts from Monday/Sunday
// TODO: allow user to hide weekends
// TODO: extract day as a component

import { computed } from 'vue'
import { getDay, formatDate } from '@/utils'
import { DAYS_IN_WEEK } from '@/constants'
import type { CalendarDay } from '@/types'

const props = withDefaults(defineProps<{ value: Date }>(), { value: () => new Date() })
const emits = defineEmits<{ 'change': [date: Date] }>()

const year = computed(() => props.value.getFullYear())
const month = computed(() => props.value.getMonth())
const date = computed(() => props.value.getDate())

const monthStarts = computed(() => new Date(year.value, month.value, 1))
const monthEnds = computed(() => new Date(year.value, month.value + 1, 0))
const daysInMonth = computed(() => monthEnds.value.getDate())

const weeks = computed(() => (
  getDay(monthStarts.value) +
  daysInMonth.value +
  ((DAYS_IN_WEEK - 1) - getDay(monthEnds.value))
) / DAYS_IN_WEEK)

const days = computed(() => {
  const res: CalendarDay[] = []

  for (let i = 0; i < (weeks.value * DAYS_IN_WEEK); i++) {
    const pureFull = new Date(
      year.value,
      month.value,
      (i + 1) - getDay(monthStarts.value),
    )

    res.push({
      pure: {
        day: pureFull.getDay(),
        date: pureFull.getDate(),
        month: pureFull.getMonth(),
        year: pureFull.getFullYear(),
        full: pureFull
      },
      formatted: formatDate(pureFull)
    })
  }

  return res
})

const dayClickHandler = (date: Date) => emits('change', date)
</script>

<style scoped lang='scss'>
[data-component-name='AppMonth'] {
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
