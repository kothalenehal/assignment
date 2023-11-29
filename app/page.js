'use client'
import Image from 'next/image'
import { create } from 'zustand'
import { useEffect, useState } from 'react';
import Category from '@/components/Category';
import { ScreenLoader } from '@/components/shared/Loading';

export default function Home() {

  const [categories, setCategories] = useState([])

  useEffect(() => { 
    fetchCategories()
  }, [])

  const fetchCategories = async () => { 
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`)
            .then(res=>res.json())
      .then((json) => {
              setCategories(json)
            })
  }

  return (
    <main className="flex flex-col w-full h-full px-[32px] space-y-[48px] py-[32px]">

      { categories.length <= 0 &&
        <ScreenLoader />
      }
      
      {categories.length > 0 &&
      <>
         {categories.map((category) => (
      
          <Category key={category} name={category} />

         ))}
        </>
      }
      
     

    </main>
  )
}
