'use client'

import Image from 'next/image'
import { useState } from 'react'

export function FloorImage({ floor, src, className = '' }: { floor: number; src: string; className?: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#1a3a5c] to-[#2563eb] text-4xl font-bold text-white ${className}`}>
        {floor}F
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`${floor}-р давхрын зураг`}
      fill
      unoptimized
      sizes="100vw"
      className={`object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  )
}
