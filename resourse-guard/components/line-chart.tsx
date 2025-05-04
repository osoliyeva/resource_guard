"use client"

import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type ChartData = {
  month: string
  value: number
  isAnomaly?: boolean
}

interface LineChartProps {
  data: ChartData[]
}

export function LineChart({ data }: LineChartProps) {
  // Anomaliyalarni ko'rsatish uchun maxsus nuqta komponenti
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props

    // Check for NaN values and return null if any coordinate is NaN
    if (isNaN(cx) || isNaN(cy)) {
      return null
    }

    // Anomaliya xususiyatini xavfsiz tekshirish
    const isAnomaly = payload && "isAnomaly" in payload ? payload.isAnomaly : false

    if (isAnomaly) {
      return (
        <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="#FF5252" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="6" />
        </svg>
      )
    }

    return (
      <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="#211C84" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="4" />
      </svg>
    )
  }

  return (
    <ChartContainer
      config={{
        value: {
          label: "Qiymat",
          color: "#211C84", // Primary
        },
      }}
      className="h-[400px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#7A73D1" opacity={0.3} />
          <XAxis
            dataKey="month"
            label={{
              value: "Oy",
              position: "insideBottom",
              offset: -10,
              fill: "#211C84",
            }}
            tick={{ fill: "#211C84" }}
            axisLine={{ stroke: "#4D55CC" }}
          />
          <YAxis
            label={{
              value: "Qiymat",
              angle: -90,
              position: "insideLeft",
              fill: "#211C84",
            }}
            tick={{ fill: "#211C84" }}
            axisLine={{ stroke: "#4D55CC" }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name, props) => {
                  // Anomaliya xususiyatini xavfsiz tekshirish
                  const isAnomaly = props.payload && "isAnomaly" in props.payload ? props.payload.isAnomaly : false
                  return [`${value} ${isAnomaly ? "(Anomaliya)" : ""}`, name]
                }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4D55CC" // Accent 2
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{
              r: 8,
              strokeWidth: 1,
              fill: "#B5A8D5",
              stroke: "#211C84",
            }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
