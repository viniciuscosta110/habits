import dayjs from 'dayjs';

export function generateDaysFromYearBeginning() {
  const firstDayOfYear = dayjs().startOf('year')
  const today = new Date()

  const days: Date[] = []

  let compareDays = firstDayOfYear

  while(compareDays.isBefore(today)) {
    days.push(compareDays.toDate())
    compareDays = compareDays.add(1, 'day')
  }

  return days
}