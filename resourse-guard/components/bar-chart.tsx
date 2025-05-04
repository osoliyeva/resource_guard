"use client"

import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type BarChartData = {
  month: string
  [key: string]: string | number | boolean
}

interface BarChartProps {
  data: BarChartData[]
  columnNames: string[]
}

export function BarChart({ data, columnNames }: BarChartProps) {
  // Yangi rang palitrasidan ranglar
  const customColors = [
    "#211C84", // Primary
    "#4D55CC", // Accent 2
    "#7A73D1", // Accent 1
  ]

  // Ustun nomlari uchun o'zbek tilidagi tarjimalar
  const columnLabels: Record<string, string> = {
    elektr_energiyasi: "Elektr energiyasi",
    elektr_sarfi: "Elektr sarfi",
    boshqa_ehtiyojlar: "Boshqa ehtiyojlar",
  }

  // ChartContainer uchun config
  const config: Record<string, { label: string; color: string }> = {}
  columnNames.forEach((column, index) => {
    config[column] = {
      label: columnLabels[column] || column,
      color: customColors[index % customColors.length],
    }
  })

  // Anomaliyalarni ko'rsatish uchun maxsus ustun komponenti
  const CustomBar = (props: any) => {
    const { x, y, width, height, fill, dataKey, payload } = props

    // Check for NaN values and return null if any coordinate is NaN
    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
      return null
    }

    // Anomaliya xususiyatini xavfsiz tekshirish
    const anomalyKey = `${dataKey}Anomaly`
    const isAnomaly = payload && anomalyKey in payload ? payload[anomalyKey] : false

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} ry={4} />
        {isAnomaly && (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="none"
            stroke="#FF5252"
            strokeWidth={2}
            strokeDasharray="5,2"
            rx={4}
            ry={4}
          />
        )}
      </g>
    )
  }

  return (
    <ChartContainer config={config} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
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
                  const columnLabel = columnLabels[name] || name
                  const isAnomaly =
                    props.payload && `${name}Anomaly` in props.payload ? props.payload[`${name}Anomaly`] : false
                  return [`${value} ${isAnomaly ? "(Anomaliya)" : ""}`, columnLabel]
                }}
              />
            }
          />
          <Legend verticalAlign="top" height={36} formatter={(value) => columnLabels[value] || value} />

          {columnNames.map((column, index) => (
            <Bar
              key={column}
              dataKey={column}
              fill={`var(--color-${column})`}
              name={column}
              shape={<CustomBar />}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
