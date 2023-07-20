import isValidDate from './isValidDate'
import shiftRight from './shiftRight'

const DAYS_IN_WEEK = 7
const DEFAULT_DAYS_ORDER = [0, 1, 2, 3, 4, 5, 6]

let savedInitialDay: number
let savedDaysOrderWithInitialDay: number[] = []

const getDay = (date: Date, initialDay: number = 1 /* Monday */) => {
  if (!isValidDate(date)) return

  const day = date.getDay();

  if (
    day > DAYS_IN_WEEK ||
    day < 0 ||
    initialDay > DAYS_IN_WEEK ||
    initialDay < 0
  ) return

  if (initialDay === savedInitialDay) return savedDaysOrderWithInitialDay[day]

  savedInitialDay = initialDay
  savedDaysOrderWithInitialDay = shiftRight(DEFAULT_DAYS_ORDER, initialDay);

  return savedDaysOrderWithInitialDay[day]
}

export default getDay
