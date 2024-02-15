import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { getVolumenConsumption } from "~/server/consumptionGetters"

const hquarterData = getVolumenConsumption('hquarter')
const hourlyData = getVolumenConsumption('hourly')
const dailyData = getVolumenConsumption('daily')

export default function Index() {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%" minHeight="500px" minWidth="500px">
        <BarChart
          data={hquarterData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="volume" />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" name="volume (L)" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%" minHeight="500px" minWidth="500px">
        <BarChart
          data={hourlyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="volume" />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" name="volume (L)" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%" minHeight="500px" minWidth="500px">
        <BarChart
          data={dailyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="volume" />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" name="volume (L)" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
