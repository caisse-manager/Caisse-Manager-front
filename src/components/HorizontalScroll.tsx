import React from 'react'

export default function HorizontalScroll({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="min-w-[300px] max-w-[300px] bg-white text-black rounded-xl p-6 shadow-lg">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  )
}
