import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type AnomalyData = {
  month: string
  column: string
  value: number
  expectedRange: [number, number]
  severity: "low" | "medium" | "high"
  description: string
}

interface AnomalyReportProps {
  anomalies: AnomalyData[]
}

export function AnomalyReport({ anomalies }: AnomalyReportProps) {
  // Ustun nomlari uchun o'zbek tilidagi tarjimalar
  const columnLabels: Record<string, string> = {
    elektr_energiyasi: "Elektr energiyasi",
    elektr_sarfi: "Elektr sarfi",
    boshqa_ehtiyojlar: "Boshqa ehtiyojlar",
  }

  if (anomalies.length === 0) {
    return (
      <div className="text-center py-8 text-accent1">
        <p>Anomaliyalar topilmadi</p>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-secondary text-primary hover:bg-secondary"
      case "medium":
        return "bg-accent1 text-primary hover:bg-accent1"
      case "high":
        return "bg-accent2 text-white hover:bg-accent2"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "low":
        return "Past"
      case "medium":
        return "O'rta"
      case "high":
        return "Yuqori"
      default:
        return severity
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-primary">Oy</TableHead>
            <TableHead className="text-primary">Ustun</TableHead>
            <TableHead className="text-primary">Qiymat</TableHead>
            <TableHead className="text-primary">Kutilgan Diapason</TableHead>
            <TableHead className="text-primary">Jiddiylik</TableHead>
            <TableHead className="text-primary">Tavsif</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {anomalies.map((anomaly, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-secondary/30"}>
              <TableCell className="font-medium text-primary">{anomaly.month}</TableCell>
              <TableCell className="text-primary">{columnLabels[anomaly.column] || anomaly.column}</TableCell>
              <TableCell className="font-semibold text-red-600">{anomaly.value}</TableCell>
              <TableCell className="text-accent1">
                {anomaly.expectedRange[0]} - {anomaly.expectedRange[1]}
              </TableCell>
              <TableCell>
                <Badge className={getSeverityColor(anomaly.severity)}>{getSeverityText(anomaly.severity)}</Badge>
              </TableCell>
              <TableCell className="text-accent1">{anomaly.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
