<template>
  <div data-component-name="App">
    <AppCalendar v-model:date="date">
      <template #header>
        <AppCalendarDaysOfWeek />
      </template>

      <template #footer>
        <AppCalendarMonths v-model:date='date' />
      </template>
    </AppCalendar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import AppCalendar from '@/components/AppCalendar.vue'
import AppCalendarDaysOfWeek from '@/components/AppCalendarDaysOfWeek.vue'
import AppCalendarMonths from '@/components/AppCalendarMonths.vue';

const date = ref(new Date())

// const months = [
//   'Январь',
//   'Февраль',
//   'Март',
//   'Апрель',
//   'Май',
//   'Июнь',
//   'Июль',
//   'Август',
//   'Сентябрь',
//   'Октябрь',
//   'Ноябрь',
//   'Декабрь'
// ]
// const actions = {
//   '19.07.23': [
//     {
//       type: 'short',
//       time: new Date(2023, 6, 19, 19),
//       title: '',
//       message: ''
//     },
//     {
//       type: 'long',
//       start: new Date(2023, 6, 19, 12),
//       end: new Date(2023, 6, 21, 21),
//       title: '',
//       message: ''
//     }
//   ],
//   '20.07.23': [
//     {
//       type: 'long',
//       start: new Date(2023, 6, 19, 12),
//       end: new Date(2023, 6, 21, 21),
//       title: '',
//       message: ''
//     }
//   ],
//   '21.07.23': [
//     {
//       type: 'long',
//       start: new Date(2023, 6, 19, 12),
//       end: new Date(2023, 6, 21, 21),
//       title: '',
//       message: ''
//     }
//   ]
// }
</script>

<style scoped lang="scss">
[data-component-name='App'] {
  padding: 25px;
}
</style>
