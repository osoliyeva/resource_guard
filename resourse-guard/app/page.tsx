import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, BarChart2, AlertTriangle, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-20 text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-16 w-16 text-accent2" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Resource Guard</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-700">
          Korrupsiyani oldini olish va resurs ma'lumotlaridagi anomaliyalarni aniqlash uchun Excel fayllarini yuklang va
          tahlil qiling
        </p>
        <Link href="/test">
          <Button className="bg-accent2 hover:bg-accent2/90 text-white px-8 py-6 text-lg rounded-lg">
            Testni Boshlash
          </Button>
        </Link>
      </section>

      <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-accent1/20 flex flex-col items-center text-center">
          <div className="p-4 bg-secondary rounded-full mb-4">
            <FileSpreadsheet className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Avtomatik Ma'lumotlar Tahlili</h2>
          <p className="text-gray-600">
            Tadbirkorlarga avtomatik ma'lumotlar tahlili xizmatini taklif etamiz. Tizim Excel formatidagi ma'lumotlarni
            qabul qiladi va ularni avtomatik ravishda tahlil qiladi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-accent1/20 flex flex-col items-center text-center">
          <div className="p-4 bg-secondary rounded-full mb-4">
            <BarChart2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Korrupsiyaga Qarshi Kurash</h2>
          <p className="text-gray-600">
            Korxonangizdagi korrupsion xolatlarni topishga yordam beramiz. Ma'lumotlar grafiklar va diagrammalar orqali
            vizuallashtiriladi, bu esa tahlilni osonlashtiradi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-accent1/20 flex flex-col items-center text-center">
          <div className="p-4 bg-secondary rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Energiya Sarfini Kuzatish</h2>
          <p className="text-gray-600">
            Energiya sarfini kuzatish va normallashtirishga hissa qo'shamiz. Tizim statistik usullar yordamida
            ma'lumotlardagi anomaliyalarni avtomatik ravishda aniqlaydi va hisobot beradi.
          </p>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Bizning Jamoa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-accent1/20">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <Image
                  src="/images/ku.png"
                  alt="Kudratullayev Ulug'bek"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary">Kudratullayev Ulug'bek</h3>
              <p className="text-accent1">Project Manager</p>
            </CardContent>
          </Card>

          <Card className="border-accent1/20">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <Image
                  src="/images/os.png"
                  alt="Soliyeva Odina"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary">Soliyeva Odina</h3>
              <p className="text-accent1">Full-stack Developer</p>
            </CardContent>
          </Card>

          <Card className="border-accent1/20">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <Image
                  src="/images/nz.png"
                  alt="Niyozova Zaynabbegim"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary">Niyozova Zaynabbegim</h3>
              <p className="text-accent1">Data Analyst</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
