import getDay from './getDay'
import isValidDate from './isValidDate'

import type { CalendarDay } from '@/types'

export default function formatDate(date: Date): CalendarDay['formatted'] | undefined {
  if (!isValidDate(date)) return

  const formattedDay = getDay(date)!
  const formattedDate = date.getDate().toString()

  let formattedMonth = (date.getMonth() + 1).toString()
  if (formattedMonth.length === 1) formattedMonth = `0${formattedMonth}`

  const formattedYear = date.getFullYear().toString().substring(2)
  const formattedFull = `0${formattedDate}.${formattedMonth}.${formattedYear}`

  return {
    day: formattedDay,
    date: formattedDate,
    month: formattedMonth,
    year: formattedYear,
    full: formattedFull
  }
}
