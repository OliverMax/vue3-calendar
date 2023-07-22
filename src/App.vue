<template>
  <div data-component-name="App">
    <AppMonthDaysOfWeek />

    <AppMonth :value="date" @change="calendarChangeHandler" />

    <div class="footer">
      <AppMonthSelector :value="date.getMonth()" @change="monthChangeHandler" />
      <AppYearSelector :value="date.getFullYear()" @change="yearChangeHandler" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import AppMonth from '@/components/AppMonth.vue'
import AppMonthDaysOfWeek from '@/components/AppMonthDaysOfWeek.vue'
import AppMonthSelector from '@/components/AppMonthSelector.vue'
import AppYearSelector from '@/components/AppYearSelector.vue'

const date = ref(new Date())

const calendarChangeHandler = (value: Date) => {
  date.value = value;
};

const yearChangeHandler = (value: number) => {
  date.value = new Date(date.value.setFullYear(value));
};

const monthChangeHandler = (value: number) => {
  date.value = new Date(date.value.setMonth(value));
};
</script>

<style scoped lang="scss">
[data-component-name="App"] {
  width: min-content;
  box-shadow: 0 0 5px #ccc;
  padding: 1rem;
  border-radius: 8px;

  [data-component-name="AppMonthDaysOfWeek"] {}

  [data-component-name="AppMonth"] {
    margin-bottom: 8px;
  }

  .footer {
    display: flex;
    justify-content: space-between;

    $width: calc((100% / 2) - 4px);

    [data-component-name="AppMonthSelector"] {
      width: $width;
    }

    [data-component-name="AppYearSelector"] {
      width: $width;
    }
  }
}
</style>
