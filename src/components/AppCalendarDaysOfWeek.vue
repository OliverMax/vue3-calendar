<template>
  <ul data-component-name='AppCalendarDaysOfWeek'>
    <li v-for='(day, idx) in daysOfWeek' :key='day' :class='{ weekday: idx > 4 }'>
      {{ day }}
    </li>
  </ul>
</template>

<script setup lang='ts'>
const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
</script>

<style scoped lang='scss'>
ul[data-component-name='AppCalendarDaysOfWeek'] {
  display: flex;
  align-items: center;
  justify-content: space-between;

  li {
    $size: 35px;

    width: $size;
    height: $size;

    display: flex;
    align-items: center;
    justify-content: center;

    text-transform: capitalize;

    &.weekday {
      color: red;
    }
  }
}
</style>
