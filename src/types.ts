export type CalendarDay = {
  pure: { day: number; date: number; month: number; year: number; full: Date }
  formatted: { date: string; month: string; year: string; full: string }
}

export type ShortAction = {
  type: 'short'
  time: Date
  title: string
  message: string
}

export type LongAction = {
  type: 'long'
  start: Date
  end: Date
  title: string
  message: string
}

export type Actions = Array<ShortAction | LongAction>
