export default function formatDate(
  date: number,
  month: number,
  year: number
): Record<'date' | 'month' | 'year' | 'full', string> {
  let formattedDate = date.toString()
  if (formattedDate.length === 1) formattedDate = `0${formattedDate}`

  let formattedMonth = (month + 1).toString()
  if (formattedMonth.length === 1) formattedMonth = `0${formattedMonth}`

  const formattedYear = year.toString().substring(2)
  const formattedFull = `${formattedDate}.${formattedMonth}.${formattedYear}`

  return {
    date: formattedDate,
    month: formattedMonth,
    year: formattedYear,
    full: formattedFull
  }
}
