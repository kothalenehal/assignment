'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Page({ params }) {

  const [product, setProduct] = useState()

  useEffect(() => { 
    fetchProduct()
  }, [])

  const fetchProduct = async () => { 
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${params.id}`)
            .then(res=>res.json())
            .then((json) => {
              setProduct(json)
            })
  }

  return (
    <div className="w-full h-full px-[32px] py-[32px]">

      { !product &&
        <div>
          <span>Please wait...</span>
        </div>
      }

      { product &&
        <div className='flex flex-row w-full h-full space-x-[48px]'>
          <div className="flex-1 overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none lg:h-[440px]">
                    <img
                    src={product.image}
                    alt={product.image}
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                    />
          </div>

          <div className='flex flex-col flex-1 space-y-4'>
            <div>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-700 rounded-full first-letter:uppercase bg-indigo-50 ring-1 ring-inset ring-indigo-700/10">
        {product.category}
      </span>
            </div>
            <span className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
              {product.title}
            </span>
            <p className="text-base text-gray-900">{product.description}</p>
            <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

            <button
                type="submit"
                className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>

          </div>

        </div>
      }
      
    </div>
  )
}