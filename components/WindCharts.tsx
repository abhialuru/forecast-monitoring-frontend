"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  time: string;
  actual: number;
  forecast: number;
}

export default function WindCharts({ data }: { data: DataPoint[] }) {
  console.log("result", data);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full md:w-[80%] max-w-8xl ">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              angle={isMobile ? -45 : 0}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(time) =>
                new Date(time).toLocaleString("en-GB", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />

            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={{
                value: "Power (MW)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              labelFormatter={(time) =>
                new Date(time).toLocaleString("en-GB", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }) + " UTC"
              }
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Generation"
              stroke="#0000FF"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast Generation"
              stroke="#00FF00"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
