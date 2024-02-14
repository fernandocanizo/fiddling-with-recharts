import { minVolumen, mediumVolumen, maxVolumen } from "~/server/lib/volumenFaker"
import { sub, format } from "date-fns/fp"

type SmcTimeRange = 'hquarter' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'

type Reading = {
  time: string,
  volume: string,
}

const subMinutes = (minutes: number, date: string | number | Date): Date => sub({
  minutes,
}, date)

const sub15Minutes = (date: string | number | Date) => subMinutes(15, date)

const normalizeToQuarter = (date: Date): Date => {
  const minutes = date.getMinutes()
  minutes >= 45 ? date.setMinutes(45) :
    minutes >= 30 ? date.setMinutes(30) :
      minutes >= 15 ? date.setMinutes(15) : date.setMinutes(0)

  return date
}

const getRealisticVolume = (personQty: number, date: Date): string => {
  // provides realistic gas/water volumen consumption according to time
  const hour = date.getHours()
  const volume = hour > 22 ? minVolumen() :
    hour > 20 ? mediumVolumen() :
      hour > 18 ? maxVolumen() :
        hour > 9 ? mediumVolumen() :
          hour > 6 ? maxVolumen() : minVolumen()

  return (personQty * volume).toFixed(2)
}

const fakeQuarter = (): Reading[]  => {
  const timeFormat = 'HH:mm'
  // houses will have between 1 and 6 persons
  const personQty = Math.floor(Math.random() * 6) + 1
  const result = []
  let start = normalizeToQuarter(new Date())

  for (let count = 100; count > 0; count -= 1) {
    const volume = getRealisticVolume(personQty, start)

    result.push({
      time: format(timeFormat, start),
      volume,
    })
    start = sub15Minutes(start)
  }

  return result.reverse()
}

const fakeHourly = (): Reading[] => [{
  time: 'fake',
  volume: '1',
}]

const fakeDaily = (): Reading[] => [{
  time: 'fake',
  volume: '1',
}]

const fakeWeekly = (): Reading[] => [{
  time: 'fake',
  volume: '1',
}]

const fakeMonthly = (): Reading[] => [{
  time: 'fake',
  volume: '1',
}]

const fakeYearly = (): Reading[] => [{
  time: 'fake',
  volume: '1',
}]

const volumenConsumption: Record<SmcTimeRange, () => Reading[]> = {
  'hquarter': fakeQuarter,
  'hourly': fakeHourly,
  'daily': fakeDaily,
  'weekly': fakeWeekly,
  'monthly': fakeMonthly,
  'yearly': fakeYearly,
}

export const getVolumenConsumption = (range: SmcTimeRange): Reading[] => {
  return volumenConsumption[range]()
}
