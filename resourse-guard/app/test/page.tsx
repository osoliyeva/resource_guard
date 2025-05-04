import { FileUploader } from "@/components/file-uploader"

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Ma'lumotlarni Yuklash va Tahlil Qilish</h1>
        <p className="text-gray-600 mb-6">
          Excel faylini yuklang. Tizim avtomatik ravishda ma'lumotlarni tahlil qiladi va anomaliyalarni aniqlaydi.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md border border-accent1/20">
          <FileUploader />
        </div>
      </div>
    </div>
  )
}
