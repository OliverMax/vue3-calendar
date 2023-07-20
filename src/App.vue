<template>
  <div data-component-name='App'>
    <AppCalendar v-model:date='date'>
      <template #header>
        <AppCalendarDaysOfWeek />
      </template>

      <template #footer>
        <AppCalendarMonths v-model:date='date' />
      </template>
    </AppCalendar>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

import AppCalendar from '@/components/AppCalendar.vue'
import AppCalendarDaysOfWeek from '@/components/AppCalendarDaysOfWeek.vue'
import AppCalendarMonths from '@/components/AppCalendarMonths.vue'

const date = ref(new Date())
</script>

<style scoped lang='scss'>
[data-component-name='App'] {
  padding: 25px;
}
</style>
