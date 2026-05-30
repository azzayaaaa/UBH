import type { Company } from './types'

const baseParams = '?auto=format&fit=crop&w=1200&q=80'

const imagesByCategory: Record<string, string> = {
  'Гоо сайхан': `https://images.unsplash.com/photo-1560066984-138dadb4c035${baseParams}`,
  'Эмнэлэг': `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d${baseParams}`,
  'Боловсрол': `https://images.unsplash.com/photo-1509062522246-3755977927d7${baseParams}`,
  IT: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3${baseParams}`,
  'Зөвлөх': `https://images.unsplash.com/photo-1556761175-b413da4baf72${baseParams}`,
  'Аялал': `https://images.unsplash.com/photo-1507525428034-b723cf961d3e7${baseParams}`,
  'Бусад': `https://images.unsplash.com/photo-1497366754035-f200968a6e72${baseParams}`
}

const imagesByName: Record<string, string> = {
  'CU Банк': `https://images.unsplash.com/photo-1554224155-6726b3ff858f${baseParams}`,
  'UBH Кофе шоп': `https://images.unsplash.com/photo-1495474472287-4d71bcdd2085${baseParams}`,
  Reception: `https://images.unsplash.com/photo-1560264280-88b68371db39${baseParams}`,
  'UBH Дэлгүүр': `https://images.unsplash.com/photo-1441986300917-64674bd600d8${baseParams}`,
  'Эмнэлгийн лаборатори': `https://images.unsplash.com/photo-1581093458791-9d42cc030c86${baseParams}`,
  'Некст IT оффис': `https://images.unsplash.com/photo-1498050108023-c5249f4df085${baseParams}`,
  'СтартАп оффис': `https://images.unsplash.com/photo-1556761175-4b46a572b786${baseParams}`,
  'Сонор хэлний сургалт': `https://images.unsplash.com/photo-1523580846011-d3a5bc25702b${baseParams}`,
  'TOEFL/GRE төв': `https://images.unsplash.com/photo-1600195077077-7c815f540a3d${baseParams}`,
  'E-Pen боловсрол': `https://images.unsplash.com/photo-1523240795612-9a054b0db644${baseParams}`,
  'Виза үйлчилгээ': `https://images.unsplash.com/photo-1450101499163-c8848c66ca85${baseParams}`,
  'Гялбаа хумсны үйлчилгээ': `https://images.unsplash.com/photo-1604654894610-df63bc536371${baseParams}`,
  'Косметик оффис': `https://images.unsplash.com/photo-1596462502278-27bfdc403348${baseParams}`,
  'Сургалтын төв': `https://images.unsplash.com/photo-1513258496099-48168024aec0${baseParams}`
}

export function getCompanyImage(company: Company) {
  return imagesByName[company.name] ?? imagesByCategory[company.category] ?? imagesByCategory['Бусад']
}
