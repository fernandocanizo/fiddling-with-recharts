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
const weeklyData = getVolumenConsumption('weekly')
const monthlyData = getVolumenConsumption('monthly')

export default function Index() {
  return (
    <>
      <h2>15 minutes time-span consumption</h2>
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

      <h2>Hourly consumption</h2>
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

      <h2>Daily consumption</h2>
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

      <h2>Weekly consumption</h2>
      <ResponsiveContainer width="100%" height="100%" minHeight="500px" minWidth="500px">
        <BarChart
          data={weeklyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="volume" />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" name="volume (m³)" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>

      <h2>Monthly consumption</h2>
      <ResponsiveContainer width="100%" height="100%" minHeight="500px" minWidth="500px">
        <BarChart
          data={monthlyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="volume" />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" name="volume (m³)" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
