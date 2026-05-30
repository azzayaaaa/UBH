import type { Company, ServiceRequest } from './types'

export const categories = ['Гоо сайхан', 'Эмнэлэг', 'Боловсрол', 'IT', 'Зөвлөх', 'Аялал', 'Бусад'] as const

export const sampleCompanies: Company[] = [
  { id: 1, name: 'CU Банк', floor: 1, room: '101', category: 'Бусад', phone: '+976 7711 0101', email: 'info@cubank.mn', website: 'https://cubank.mn', hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Банк, төлбөр тооцоо, өдөр тутмын санхүүгийн үйлчилгээ.' },
  { id: 2, name: 'UBH Кофе шоп', floor: 1, room: '103', category: 'Бусад', phone: '+976 7711 0103', email: 'coffee@ubh.mn', website: null, hours: 'Өдөр бүр 08:00-21:00', logo: null, description: 'Түрээслэгч, зочдод зориулсан кофе, хөнгөн зуушны тохилог хэсэг.' },
  { id: 3, name: 'Reception', floor: 1, room: '100', category: 'Бусад', phone: '+976 7711 0100', email: 'reception@ubh.mn', website: null, hours: 'Өдөр бүр 08:00-20:00', logo: null, description: 'Зочин угтах, чиглүүлэх, мэдээлэл өгөх төв хэсэг.' },
  { id: 4, name: 'UBH Дэлгүүр', floor: 1, room: '105', category: 'Бусад', phone: '+976 7711 0105', email: 'shop@ubh.mn', website: null, hours: 'Өдөр бүр 09:00-21:00', logo: null, description: 'Өдөр тутмын хэрэглээ, бичиг хэрэг, жижиг худалдааны үйлчилгээ.' },
  { id: 5, name: 'Ариун гоо салон', floor: 2, room: '204', category: 'Гоо сайхан', phone: '+976 7711 0204', email: 'hello@ariungoo.mn', website: 'https://ariungoo.mn', hours: 'Даваа-Бямба 10:00-20:00', logo: null, description: 'Үс, нүүр будалт, арьс арчилгааны иж бүрэн үйлчилгээ.' },
  { id: 6, name: 'Тэнгэр зөвлөх оффис', floor: 2, room: '208', category: 'Зөвлөх', phone: '+976 7711 0208', email: 'office@tengerconsult.mn', website: null, hours: 'Даваа-Баасан 09:30-18:00', logo: null, description: 'Жижиг, дунд бизнесийн санхүү, менежментийн зөвлөгөө.' },
  { id: 7, name: 'Энх клиник', floor: 3, room: '301', category: 'Эмнэлэг', phone: '+976 7711 0301', email: 'clinic@enkh.mn', website: 'https://enkhclinic.mn', hours: 'Даваа-Бямба 09:00-19:00', logo: null, description: 'Ерөнхий үзлэг, оношилгоо, урьдчилан сэргийлэх багц үйлчилгээ.' },
  { id: 8, name: 'Эмнэлгийн лаборатори', floor: 3, room: '310', category: 'Эмнэлэг', phone: '+976 7711 0310', email: 'lab@med.mn', website: null, hours: 'Даваа-Баасан 08:00-17:00', logo: null, description: 'Цус, биохими, дааврын шинжилгээний лаборатори.' },
  { id: 9, name: 'UBH Шинжилгээний төв', floor: 4, room: '401', category: 'Эмнэлэг', phone: '+976 7711 0401', email: 'info@ubhshinjilgee.mn', website: 'https://ubhshinjilgee.mn', hours: 'Даваа-Бямба 08:30-18:30', logo: null, description: 'Эрүүл мэндийн шинжилгээ, оношилгооны төв.' },
  { id: 10, name: 'ЭХО оношилгоо', floor: 4, room: '408', category: 'Эмнэлэг', phone: '+976 7711 0408', email: 'echo@diagnostic.mn', website: null, hours: 'Даваа-Баасан 09:00-17:30', logo: null, description: 'ЭХО болон дүрс оношилгооны нарийн үйлчилгээ.' },
  { id: 11, name: 'Итгэл нягтлан бодох', floor: 5, room: '505', category: 'Зөвлөх', phone: '+976 7711 0505', email: 'account@itgel.mn', website: 'https://itgel.mn', hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Нягтлан бодох бүртгэл, татварын тайлан, аудитын бэлтгэл.' },
  { id: 12, name: 'Бизнес зөвлөх', floor: 5, room: '510', category: 'Зөвлөх', phone: '+976 7711 0510', email: 'hello@bizconsult.mn', website: null, hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Бизнес төлөвлөгөө, үйл ажиллагаа, санхүүгийн зөвлөх үйлчилгээ.' },
  { id: 13, name: 'Некст IT оффис', floor: 6, room: '601', category: 'IT', phone: '+976 7711 0601', email: 'team@nextit.mn', website: 'https://nextit.mn', hours: 'Даваа-Баасан 09:00-19:00', logo: null, description: 'Програм хангамж, дотоод систем, үүлэн үйлчилгээ хөгжүүлдэг баг.' },
  { id: 14, name: 'СтартАп оффис', floor: 6, room: '612', category: 'IT', phone: '+976 7711 0612', email: 'space@startup.mn', website: null, hours: 'Даваа-Баасан 08:00-20:00', logo: null, description: 'Технологийн стартап багуудад зориулсан оффис, хамтын орон зай.' },
  { id: 15, name: 'Сонор хэлний сургалт', floor: 7, room: '704', category: 'Боловсрол', phone: '+976 7711 0704', email: 'learn@sonor.mn', website: 'https://sonor.mn', hours: 'Даваа-Бямба 09:00-20:00', logo: null, description: 'Англи, солонгос, япон хэлний түвшин ахиулах сургалт.' },
  { id: 16, name: 'Боловсролын оффис', floor: 7, room: '708', category: 'Боловсрол', phone: '+976 7711 0708', email: 'edu@office.mn', website: null, hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Сургалтын хөтөлбөр, зөвлөгөө, боловсролын үйлчилгээ.' },
  { id: 17, name: 'Од аялал жуулчлал', floor: 8, room: '802', category: 'Аялал', phone: '+976 7711 0802', email: 'travel@od.mn', website: 'https://odtravel.mn', hours: 'Даваа-Баасан 10:00-18:00', logo: null, description: 'Дотоод, гадаад аялал, аяллын даатгал, багц төлөвлөлт.' },
  { id: 18, name: 'Виза үйлчилгээ', floor: 8, room: '806', category: 'Аялал', phone: '+976 7711 0806', email: 'visa@service.mn', website: null, hours: 'Даваа-Баасан 09:30-17:30', logo: null, description: 'Визийн материал бүрдүүлэлт, цаг захиалга, зөвлөгөө.' },
  { id: 19, name: 'Луна гоо сайхны студи', floor: 9, room: '901', category: 'Гоо сайхан', phone: '+976 7711 0901', email: 'studio@luna.mn', website: 'https://luna.mn', hours: 'Өдөр бүр 10:00-21:00', logo: null, description: 'Арьс арчилгаа, нүүр будалт, сормуусны үйлчилгээ.' },
  { id: 20, name: 'Гялбаа хумсны үйлчилгээ', floor: 9, room: '909', category: 'Гоо сайхан', phone: '+976 7711 0909', email: 'nails@gyalbaa.mn', website: null, hours: 'Даваа-Бямба 10:00-20:00', logo: null, description: 'Хумс засал, гелэн будалт, гар хөлийн арчилгаа.' },
  { id: 21, name: 'Аура гоо сайхны академи', floor: 10, room: '1002', category: 'Гоо сайхан', phone: '+976 7711 1002', email: 'academy@aura.mn', website: 'https://auraacademy.mn', hours: 'Даваа-Бямба 09:00-18:00', logo: null, description: 'Гоо сайхны мэргэжлийн сургалт, дадлагын кабинет.' },
  { id: 22, name: 'Косметик оффис', floor: 10, room: '1008', category: 'Гоо сайхан', phone: '+976 7711 1008', email: 'cosmetic@office.mn', website: null, hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Гоо сайхны бүтээгдэхүүн, нийлүүлэлт, сургалтын оффис.' },
  { id: 23, name: 'Корпорат оффис', floor: 11, room: '1101', category: 'Бусад', phone: '+976 7711 1101', email: 'office@corporate.mn', website: null, hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Хувийн компанийн удирдлага, борлуулалтын оффис.' },
  { id: 24, name: 'Сургалтын төв', floor: 12, room: '1207', category: 'Боловсрол', phone: '+976 7711 1207', email: 'info@training.mn', website: 'https://training.mn', hours: 'Даваа-Бямба 09:00-19:00', logo: null, description: 'Сургалтын хөтөлбөр, багшийн хөгжил, байгууллагын сургалт.' },
  { id: 25, name: 'СтартАп төв', floor: 12, room: '1210', category: 'IT', phone: '+976 7711 1210', email: 'hub@startup.mn', website: null, hours: 'Даваа-Баасан 09:00-20:00', logo: null, description: 'Стартап багуудын уулзалт, прототип, бүтээгдэхүүн хөгжүүлэлтийн орчин.' },
  { id: 26, name: 'Бизнес студи', floor: 13, room: '1303', category: 'Зөвлөх', phone: '+976 7711 1303', email: 'hello@bizstudio.mn', website: null, hours: 'Даваа-Баасан 09:30-18:30', logo: null, description: 'Бизнес төлөвлөгөө, брэнд хөгжүүлэлт, контент студи.' },
  { id: 27, name: 'Гүйцэтгэх оффис', floor: 14, room: '1401', category: 'Бусад', phone: '+976 7711 1401', email: 'exec@office.mn', website: null, hours: 'Даваа-Баасан 09:00-18:00', logo: null, description: 'Удирдлагын уулзалт, хувийн оффисын зохион байгуулалт.' },
  { id: 28, name: 'E-Pen боловсрол', floor: 15, room: '1501', category: 'Боловсрол', phone: '+976 7711 1501', email: 'info@epen.mn', website: 'https://epen.mn', hours: 'Даваа-Бямба 09:00-19:00', logo: null, description: 'Гадаадад суралцах төлөвлөгөө, сургууль сонголт, эсээний зөвлөгөө.' },
  { id: 29, name: 'TOEFL/GRE төв', floor: 15, room: '1505', category: 'Боловсрол', phone: '+976 7711 1505', email: 'test@epen.mn', website: 'https://epen.mn/tests', hours: 'Даваа-Ням 08:00-20:00', logo: null, description: 'TOEFL, GRE шалгалтын бэлтгэл, оношлох тест, зөвлөх багш нар.' }
]

export const floorNotes: Record<number, string> = {
  0: 'B1: Зогсоол, агуулах',
  1: 'CU Банк, кофе шоп, reception, дэлгүүр',
  15: 'E-Pen боловсрол, TOEFL/GRE төв'
}

export const sampleRequests: ServiceRequest[] = [
  { id: 1, companyName: 'Некст IT оффис', contactPhone: '+976 7711 0601', requestType: 'IT_SUPPORT', description: '6-р давхрын хурлын өрөөний сүлжээ тасалдаж байна.', status: 'IN_PROGRESS', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, companyName: 'Луна гоо сайхны студи', contactPhone: '+976 7711 0901', requestType: 'CLEANING', description: 'Оройн ээлжийн дараа нэмэлт цэвэрлэгээ хийлгэх хүсэлттэй.', status: 'PENDING', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, companyName: 'TOEFL/GRE төв', contactPhone: '+976 7711 1505', requestType: 'ELECTRICITY', description: '1505 өрөөний гэрэлтүүлэг анивчаад байна.', status: 'COMPLETED', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
]
