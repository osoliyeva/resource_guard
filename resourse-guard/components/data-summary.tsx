import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, TrendingDown, BarChart2 } from "lucide-react"

type AnomalyData = {
  month: string
  column: string
  value: number
  expectedRange: [number, number]
  severity: "low" | "medium" | "high"
  description: string
}

interface DataSummaryProps {
  data: any[]
  columnNames: string[]
  anomalies: AnomalyData[]
}

export function DataSummary({ data, columnNames, anomalies }: DataSummaryProps) {
  // Ustun nomlari uchun o'zbek tilidagi tarjimalar
  const columnLabels: Record<string, string> = {
    elektr_energiyasi: "Elektr energiyasi",
    elektr_sarfi: "Elektr sarfi",
    boshqa_ehtiyojlar: "Boshqa ehtiyojlar",
  }

  // Statistik ma'lumotlarni hisoblash
  const summaryStats = columnNames.map((column) => {
    const values = data.map((row) => Number.parseFloat(row[column])).filter((val) => !isNaN(val))

    const sum = values.reduce((acc, val) => acc + val, 0)
    const avg = sum / values.length
    const max = Math.max(...values)
    const min = Math.min(...values)

    // Maksimal va minimal qiymatli oylarni topish
    const maxMonth = data.find((row) => Number.parseFloat(row[column]) === max)?.month
    const minMonth = data.find((row) => Number.parseFloat(row[column]) === min)?.month

    // Trendni hisoblash (oxirgi qiymatni o'rtacha bilan taqqoslash)
    const lastValue = values[values.length - 1]
    const trend = lastValue > avg ? "up" : "down"
    const trendPercent = Math.abs(Math.round(((lastValue - avg) / avg) * 100))

    // Ustun uchun anomaliyalar sonini hisoblash
    const anomalyCount = anomalies.filter((a) => a.column === column).length

    return {
      column,
      columnLabel: columnLabels[column] || column,
      avg: avg.toFixed(2),
      max,
      min,
      maxMonth,
      minMonth,
      trend,
      trendPercent,
      anomalyCount,
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-accent1/20 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent1">Jami Oylar</p>
                <h3 className="text-2xl font-bold text-primary">{data.length}</h3>
              </div>
              <div className="p-2 bg-secondary rounded-full">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent1/20 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent1">Jami Ustunlar</p>
                <h3 className="text-2xl font-bold text-primary">{columnNames.length}</h3>
              </div>
              <div className="p-2 bg-secondary rounded-full">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent1/20 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent1">Jami Anomaliyalar</p>
                <h3 className="text-2xl font-bold text-primary">{anomalies.length}</h3>
              </div>
              <div className="p-2 bg-secondary rounded-full">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent1/20 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent1">Anomaliya Foizi</p>
                <h3 className="text-2xl font-bold text-primary">
                  {data.length > 0 ? Math.round((anomalies.length / (data.length * columnNames.length)) * 100) : 0}%
                </h3>
              </div>
              <div className="p-2 bg-secondary rounded-full">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-3 text-primary">Ustunlar bo'yicha statistika</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-secondary to-white border-accent1/20">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-lg mb-2 text-primary">{stat.columnLabel}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-accent1">O'rtacha qiymat:</span>
                  <span className="font-medium text-primary">{stat.avg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent1">Maksimal qiymat:</span>
                  <span className="font-medium text-primary">
                    {stat.max} ({stat.maxMonth})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent1">Minimal qiymat:</span>
                  <span className="font-medium text-primary">
                    {stat.min} ({stat.minMonth})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-accent1">Trend:</span>
                  <div className="flex items-center">
                    {stat.trend === "up" ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-green-600">+{stat.trendPercent}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        <span className="text-red-600">-{stat.trendPercent}%</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent1">Anomaliyalar:</span>
                  <span className={`font-medium ${stat.anomalyCount > 0 ? "text-red-600" : "text-green-600"}`}>
                    {stat.anomalyCount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
