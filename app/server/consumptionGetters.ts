import { minVolumen, mediumVolumen, maxVolumen } from "~/server/lib/volumenFaker"
import { sub, format } from "date-fns/fp"

type SmcTimeRange = 'hquarter' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'

type Reading = {
  time: string,
  volume: number,
}

const personQty = Math.floor(Math.random() * 6) + 1

const randomize = (value: number): number => value * (Math.random() * (1.1 - 0.9) + 0.9)

const subMinutes = (minutes: number, date: string | number | Date): Date => sub({
  minutes,
}, date)

const sub15Minutes = (date: string | number | Date) => subMinutes(15, date)
const sub1Hour = (date: string | number | Date) => subMinutes(60, date)
const sub1Day = (date: string | number | Date) => sub({
  days: 1,
}, date)

const normalizeToQuarter = (date: Date): Date => {
  const minutes = date.getMinutes()
  minutes >= 45 ? date.setMinutes(45) :
    minutes >= 30 ? date.setMinutes(30) :
      minutes >= 15 ? date.setMinutes(15) : date.setMinutes(0)

  return date
}

const normalizeHour = (date: Date): Date => {
  date.setMinutes(0)
  return date
}

const getRealisticVolume = (personQty: number, date: Date): number => {
  // provides realistic gas/water volumen consumption according to time for a 15
  // minutes time-span
  const hour = date.getHours()
  const volume = hour > 22 ? minVolumen() :
    hour > 20 ? mediumVolumen() :
      hour > 18 ? maxVolumen() :
        hour > 9 ? mediumVolumen() :
          hour > 6 ? maxVolumen() : minVolumen()

  // make it a number again so Recharts knows how to create a proper axis to
  // hold all range of values
  return Number((personQty * volume).toFixed(2))
}

const fakeQuarter = (): Reading[]  => {
  const timeFormat = 'HH:mm'
  // houses will have between 1 and 6 persons
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

const fakeHourly = (): Reading[] => {
  const timeFormat = 'HH:00'
  const result = []
  let start = normalizeHour(new Date())

  for (let count = 25; count > 0; count -= 1) {
    const volume = getRealisticVolume(personQty, start) * 4

    result.push({
      time: format(timeFormat, start),
      volume,
    })
    start = sub1Hour(start)
  }

  return result.reverse()
}

const fakeDaily = (): Reading[] => {
  const dateFormat = 'MM-dd'
  const result = []
  let start = new Date()
  start.setUTCMinutes(0)

  for (let count = 0; count < 35; count++) {
    let dailyVolume = 0
    for (let hour = 0; hour < 24; hour++) {
      // fake a daily consumption by calling `getRealisticVolume` "all day"
      start.setUTCHours(hour)
      dailyVolume += getRealisticVolume(personQty, start) * 4
    }

    result.push({
      time: format(dateFormat, start),
      volume: Number(dailyVolume.toFixed(2)),
    })
    start = sub1Day(start)
  }

  return result.reverse()
}

const fakeWeekly = (): Reading[] => {
  const dateFormat = 'yyyy.ww'
  const result = []
  let date = new Date()
  date.setUTCMinutes(0)
  date.setUTCHours(0)

  for (let count = 0; count < 60; count++) {
    let volume = 0
    for (let day = 0; day < 7; day++) {
      // simulate daily consumption for a week
      for (let hour = 0; hour < 24; hour++) {
        // fake a daily consumption by calling `getRealisticVolume` "all day"
        volume += getRealisticVolume(personQty, date) * 4
      }
      date = sub1Day(date)
    }

    result.push({
      time: format(dateFormat, date),
      volume: Number((volume / 1000).toFixed(2)), // start using m3
    })
  }

  return result.reverse()
}

const fakeMonthly = (): Reading[] => {
  const dateFormat = 'yyyy-MM'
  const result = []
  let date = new Date()
  date.setUTCMinutes(0)
  date.setUTCHours(0)
  const monthQty = 13

  for (let count = 0; count < monthQty; count++) {
    let volume = 0
    for (let day = 0; day < 30; day++) { // not so realistic
      for (let hour = 0; hour < 24; hour++) {
        // fake a daily consumption by calling `getRealisticVolume` "all day"
        volume += getRealisticVolume(personQty, date) * 4
      }
      date = sub1Day(date)
    }

    result.push({
      time: format(dateFormat, date),
      volume: Number((randomize(volume) / 1000).toFixed(2)), // start using m3
    })
  }

  return result.reverse()
}

const fakeYearly = (): Reading[] => {
  const dateFormat = 'yyyy'
  const result = []
  let date = new Date()
  date.setUTCMinutes(0)
  date.setUTCHours(0)
  const yearQty = 5

  for (let count = 0; count < yearQty; count++) {
    let volume = 0
    for (let month = 0; month < 12; month++) {
      for (let day = 0; day < 30; day++) { // not so realistic
        for (let hour = 0; hour < 24; hour++) {
          // fake a daily consumption by calling `getRealisticVolume` "all day"
          volume += getRealisticVolume(personQty, date) * 4
        }
        date = sub1Day(date)
      }
    }

    result.push({
      time: format(dateFormat, date),
      // make it a little bit random
      volume: Number((randomize(volume) / 1000).toFixed(2)),
    })
  }

  return result.reverse()
}

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
