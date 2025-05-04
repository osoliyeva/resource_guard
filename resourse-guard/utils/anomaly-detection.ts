type AnomalyData = {
  month: string
  column: string
  value: number
  expectedRange: [number, number]
  severity: "low" | "medium" | "high"
  description: string
}

// Ustun nomlari uchun o'zbek tilidagi tarjimalar
const columnLabels: Record<string, string> = {
  elektr_energiyasi: "Elektr energiyasi",
  elektr_sarfi: "Elektr sarfi",
  boshqa_ehtiyojlar: "Boshqa ehtiyojlar",
}

/**
 * Ma'lumotlardagi anomaliyalarni statistik usullar yordamida aniqlash
 * @param data Excel faylidan olingan xom ma'lumotlar
 * @param columns Anomaliyalarni aniqlash uchun ustunlar
 * @returns Aniqlangan anomaliyalar massivi
 */
export function detectAnomalies(data: any[], columns: string[]): AnomalyData[] {
  const anomalies: AnomalyData[] = []

  columns.forEach((column) => {
    // Ustun uchun qiymatlarni ajratib olish
    const values = data.map((row) => Number.parseFloat(row[column])).filter((val) => !isNaN(val))

    // O'rtacha qiymat va standart og'ishni hisoblash
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const stdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length)

    // Anomaliyalar uchun chegaralarni aniqlash (z-score yordamida)
    const lowThreshold = 1.5 // O'rtacha qiymatdan 1.5 standart og'ish farq qiluvchi qiymatlar
    const mediumThreshold = 2.0 // O'rtacha qiymatdan 2 standart og'ish farq qiluvchi qiymatlar
    const highThreshold = 3.0 // O'rtacha qiymatdan 3 standart og'ish farq qiluvchi qiymatlar

    // Har bir ma'lumot nuqtasini anomaliyalar uchun tekshirish
    data.forEach((row) => {
      const value = Number.parseFloat(row[column])
      if (isNaN(value)) return

      const zScore = Math.abs((value - mean) / stdDev)

      if (zScore > lowThreshold) {
        let severity: "low" | "medium" | "high" = "low"
        if (zScore > highThreshold) {
          severity = "high"
        } else if (zScore > mediumThreshold) {
          severity = "medium"
        }

        // Kutilgan diapazonni hisoblash
        const lowerBound = mean - lowThreshold * stdDev
        const upperBound = mean + lowThreshold * stdDev

        // Tavsif yaratish
        const direction = value > mean ? "yuqori" : "past"
        const columnLabel = columnLabels[column] || column
        const description = `${columnLabel} qiymati kutilgan diapazondan ${direction}. Bu ${getAnomalyDescription(column, severity)}.`

        anomalies.push({
          month: row.month,
          column,
          value,
          expectedRange: [Math.round(lowerBound * 100) / 100, Math.round(upperBound * 100) / 100],
          severity,
          description,
        })
      }
    })
  })

  return anomalies
}

/**
 * Ustun va jiddiylik asosida anomaliya tavsifini yaratish
 */
function getAnomalyDescription(column: string, severity: "low" | "medium" | "high"): string {
  const columnLabel = columnLabels[column] || column

  const severityText = {
    low: "e'tiborga olish kerak bo'lgan",
    medium: "tekshirilishi kerak bo'lgan",
    high: "jiddiy",
  }

  return `${columnLabel} ustunidagi ${severityText[severity]} anomaliya`
}
