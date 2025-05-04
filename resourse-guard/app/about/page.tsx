import { Card, CardContent } from "@/components/ui/card"
import { FileSpreadsheet, BarChart2, AlertTriangle, Shield } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <Shield className="h-16 w-16 text-accent2" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-primary text-center">Resource Guard Haqida</h1>
        <Card className="border-accent1/20">
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-6">
              "Resource Guard" loyihasi "Innovate" jamoasi tomonidan ishlab chiqilgan bo'lib, resurs ma'lumotlarida
              anomaliyalarni aniqlash va korrupsiyani oldini olish maqsadida yaratilgan. Tizim Excel fayllarini tahlil
              qiladi va statistik usullar yordamida anomaliyalarni aniqlaydi.
            </p>

            <h2 className="text-xl font-semibold mb-3 text-primary">Loyihamiz asosiy maqsadlari:</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>
                <span className="font-medium text-primary">
                  Tadbirkorlarga avtomatik ma'lumotlar tahlili xizmatini taklif etish
                </span>{" "}
                - Bizning tizim tadbirkorlar uchun ma'lumotlarni avtomatik tahlil qilish imkonini beradi, bu esa vaqt va
                resurslarni tejashga yordam beradi.
              </li>
              <li>
                <span className="font-medium text-primary">
                  Korxonangizdagi korrupsion xolatlarni topishga yordam berish
                </span>{" "}
                - Tizim ma'lumotlardagi anomaliyalarni aniqlash orqali korrupsion xolatlarni aniqlashga yordam beradi.
              </li>
              <li>
                <span className="font-medium text-primary">
                  Energiya sarfini kuzatish va normallashtirishga hissa qo'shish
                </span>{" "}
                - Tizim energiya sarfini kuzatish va anomaliyalarni aniqlash orqali energiya sarfini normallashtirishga
                yordam beradi.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-3 text-primary">Qanday ishlaydi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col items-center text-center p-4 bg-secondary/20 rounded-lg">
                <FileSpreadsheet className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-primary">1. Faylni yuklang</h3>
                <p className="text-sm text-gray-600">Excel formatidagi ma'lumotlarni tizimga yuklang</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/20 rounded-lg">
                <BarChart2 className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-primary">2. Tahlil qiling</h3>
                <p className="text-sm text-gray-600">Tizim ma'lumotlarni tahlil qiladi va grafiklarni yaratadi</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/20 rounded-lg">
                <AlertTriangle className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-primary">3. Natijalarni ko'ring</h3>
                <p className="text-sm text-gray-600">Anomaliyalar aniqlanadi va hisobot tayyorlanadi</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-3 text-primary">Bizning Jamoa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 border border-accent1/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-primary">
                    <Image
                      src="/images/ku.png"
                      alt="Kudratullayev Ulug'bek"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Kudratullayev Ulug'bek</h3>
                    <p className="text-accent1 text-sm">Project Manager</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Loyiha rahbari sifatida jamoani boshqaradi va loyihaning muvaffaqiyatli amalga oshirilishini
                  ta'minlaydi.
                </p>
              </div>

              <div className="p-4 border border-accent1/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-primary">
                    <Image
                      src="/images/os.png"
                      alt="Soliyeva Odina"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Soliyeva Odina</h3>
                    <p className="text-accent1 text-sm">Full-stack Developer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Tizimning front-end va back-end qismlarini ishlab chiqadi va texnik jihatdan qo'llab-quvvatlaydi.
                </p>
              </div>

              <div className="p-4 border border-accent1/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-primary">
                    <Image
                      src="/images/nz.png"
                      alt="Niyozova Zaynabbegim"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Niyozova Zaynabbegim</h3>
                    <p className="text-accent1 text-sm">Data Analyst</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Ma'lumotlarni tahlil qilish va anomaliyalarni aniqlash algoritmlarini ishlab chiqadi.
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              "Resource Guard" tizimi davlat organlari, korxonalar va tashkilotlar uchun resurs ma'lumotlarini nazorat
              qilish va korrupsiyani oldini olish uchun foydali vosita bo'lib xizmat qiladi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
