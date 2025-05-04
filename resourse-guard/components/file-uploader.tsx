"use client"

import type React from "react"

import { useState } from "react"
import * as XLSX from "xlsx"
import { LineChart } from "@/components/line-chart"
import { BarChart } from "@/components/bar-chart"
import { AnomalyReport } from "@/components/anomaly-report"
import { DataSummary } from "@/components/data-summary"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, AlertTriangle, FileText, BarChartIcon, LineChartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { detectAnomalies } from "@/utils/anomaly-detection"

type ChartData = {
  month: string
  value: number
  isAnomaly?: boolean
}

type BarChartData = {
  month: string
  [key: string]: string | number | boolean
}

type AnomalyData = {
  month: string
  column: string
  value: number
  expectedRange: [number, number]
  severity: "low" | "medium" | "high"
  description: string
}

// Aniq ustun nomlari
const TARGET_COLUMNS = ["elektr_energiyasi", "elektr_sarfi", "boshqa_ehtiyojlar"]

export function FileUploader() {
  const [chartData, setChartData] = useState<ChartData[] | null>(null)
  const [barChartData, setBarChartData] = useState<BarChartData[] | null>(null)
  const [anomalies, setAnomalies] = useState<AnomalyData[]>([])
  const [columnNames, setColumnNames] = useState<string[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<any[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        setRawData(jsonData)

        if (jsonData.length === 0) {
          setError("Fayl bo'sh yoki ma'lumotlar topilmadi")
          return
        }

        // Check if 'month' column exists
        const firstRow = jsonData[0] as Record<string, any>
        if (!("month" in firstRow)) {
          setError("'month' ustuni topilmadi")
          return
        }

        // Get all column names
        const keys = Object.keys(firstRow)

        // Aniq ustun nomlarini tekshirish va mavjud bo'lganlarini olish
        const availableColumns = TARGET_COLUMNS.filter((col) => keys.includes(col))

        if (availableColumns.length === 0) {
          setError(
            "Kerakli ustunlar topilmadi. Kamida bitta ustun ('elektr_energiyasi', 'elektr sarfi', 'boshqa ehtiyojlar') mavjud bo'lishi kerak",
          )
          return
        }

        setColumnNames(availableColumns)

        // Birinchi ustun uchun chiziqli grafik ma'lumotlarini olish
        const firstColumn = availableColumns[0]
        const lineChartData = jsonData.map((row: any) => {
          const value = Number.parseFloat(row[firstColumn])
          return {
            month: row.month,
            value: isNaN(value) ? 0 : value, // Replace NaN with 0 or another default value
          }
        })

        // Barcha ustunlar uchun ustunli grafik ma'lumotlarini olish
        const barChartData = jsonData.map((row: any) => {
          const result: BarChartData = { month: row.month }

          availableColumns.forEach((column) => {
            const value = Number.parseFloat(row[column])
            result[column] = isNaN(value) ? 0 : value // Replace NaN with 0 or another default value
          })

          return result
        })

        // Anomaliyalarni aniqlash
        const anomalyResults = detectAnomalies(jsonData, availableColumns)

        // Chiziqli grafikda anomaliyalarni belgilash
        const lineChartDataWithAnomalies = lineChartData.map((item) => {
          const hasAnomaly = anomalyResults.some(
            (anomaly) => anomaly.month === item.month && anomaly.column === firstColumn,
          )
          return { ...item, isAnomaly: hasAnomaly }
        })

        // Ustunli grafikda anomaliyalarni belgilash
        const barChartDataWithAnomalies = barChartData.map((item) => {
          const result = { ...item }

          // Avval barcha ustunlar uchun anomaliya belgilarini false qilib o'rnatish
          availableColumns.forEach((column) => {
            result[`${column}Anomaly`] = false
          })

          // Keyin anomaliyasi bor ustunlar uchun true qiymatini o'rnatish
          availableColumns.forEach((column) => {
            const hasAnomaly = anomalyResults.some(
              (anomaly) => anomaly.month === item.month && anomaly.column === column,
            )
            if (hasAnomaly) {
              result[`${column}Anomaly`] = true
            }
          })

          return result
        })

        setChartData(lineChartDataWithAnomalies)
        setBarChartData(barChartDataWithAnomalies)
        setAnomalies(anomalyResults)
      } catch (err) {
        console.error("Faylni tahlil qilishda xatolik:", err)
        setError("Faylni tahlil qilishda xatolik yuz berdi. Excel fayl formatini tekshiring.")
      }
    }

    reader.readAsArrayBuffer(file)
  }

  const exportAnomalyReport = () => {
    if (!anomalies.length) return

    // Create a CSV string
    let csvContent = "Oy,Ustun,Qiymat,Kutilgan Diapason,Jiddiylik,Tavsif\n"

    anomalies.forEach((anomaly) => {
      csvContent += `${anomaly.month},${anomaly.column},${anomaly.value},"${anomaly.expectedRange[0]}-${anomaly.expectedRange[1]}",${anomaly.severity},${anomaly.description}\n`
    })

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "anomaliya_hisoboti.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-accent1/20 bg-white">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 border-accent1/30"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-primary" />
              <p className="mb-2 text-sm text-primary">
                <span className="font-semibold">Faylni tanlash uchun bosing</span> yoki bu yerga tashlang
              </p>
              <p className="text-xs text-accent1">Excel (.xlsx) fayllari</p>
            </div>
            <input id="file-upload" type="file" className="hidden" accept=".xlsx" onChange={handleFileUpload} />
          </label>

          {fileName && <p className="mt-2 text-sm text-accent1">Tanlangan fayl: {fileName}</p>}

          {error && <p className="mt-2 text-sm text-red-600">Xatolik: {error}</p>}
        </div>
      </Card>

      {chartData && chartData.length > 0 && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50 border border-accent1/30">
            <TabsTrigger value="summary" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Umumiy Ma'lumot
            </TabsTrigger>
            <TabsTrigger value="line" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <LineChartIcon className="w-4 h-4 mr-2" />
              Chiziqli Grafik
            </TabsTrigger>
            <TabsTrigger value="bar" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <BarChartIcon className="w-4 h-4 mr-2" />
              Ustunli Grafik
            </TabsTrigger>
            <TabsTrigger
              value="anomalies"
              className="data-[state=active]:bg-primary data-[state=active]:text-white relative"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Anomaliyalar
              {anomalies.length > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                    {anomalies.length}
                  </span>
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <Card className="p-6 border-accent1/20 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-primary">Umumiy Ma'lumot</h2>
              <DataSummary data={rawData} columnNames={columnNames} anomalies={anomalies} />
            </Card>
          </TabsContent>

          <TabsContent value="line" className="mt-4">
            <Card className="p-6 border-accent1/20 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-primary">Chiziqli Grafik</h2>
              <p className="text-sm text-accent1 mb-4">
                Qizil nuqtalar anomaliyalarni ko'rsatadi. Ular kutilgan qiymatlardan sezilarli darajada farq qiladi.
              </p>
              <LineChart data={chartData} />
            </Card>
          </TabsContent>

          <TabsContent value="bar" className="mt-4">
            <Card className="p-6 border-accent1/20 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-primary">Ustunli Grafik</h2>
              <p className="text-center text-sm text-accent1 mb-4">
                Oy va {columnNames.join(", ")} ustunlari asosida. Qizil chegarali ustunlar anomaliyalarni ko'rsatadi.
              </p>
              <BarChart data={barChartData} columnNames={columnNames} />
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="mt-4">
            <Card className="p-6 border-accent1/20 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary">Aniqlangan Anomaliyalar</h2>
                {anomalies.length > 0 && (
                  <Button
                    onClick={exportAnomalyReport}
                    variant="outline"
                    size="sm"
                    className="border-accent1 text-primary hover:bg-secondary"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Hisobotni Yuklab Olish
                  </Button>
                )}
              </div>
              <AnomalyReport anomalies={anomalies} />
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
