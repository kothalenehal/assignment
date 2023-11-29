'use client'
import RatingBar from '@/components/shared/RatingBar';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useUserCartStore } from '@/stores/cart';
import * as dayjs from "dayjs"
import AlertComponent from '@/components/shared/Alert';
import { ScreenLoader } from '@/components/shared/Loading';

export default function Page({ params }) {

  const [product, setProduct] = useState()

  const [quantity, setQuantity] = useState(1)

  const [message, setMessage] = useState()

  const reloadCartItems = useUserCartStore(state => state.reloadItems)

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

  async function addToCart() { 
    
    const body = {
      userId: process.env.NEXT_PUBLIC_USERID,
      date: dayjs().format("YYYY-MM-DD"),
      products: [{
        productId: product.id,
        quantity: quantity
      }]
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts`, {
      method: "POST",
      body: JSON.stringify(body)
    })

    showMessage("Added into cart")

    reloadCartItems()

  }

  function increment() { 
    var value = quantity + 1
    if (value > 5) { 
      value = 5
    }
    setQuantity(value)
  }

  function decrement() { 
    var value = quantity - 1
    if (value <= 1) { 
      value = 1
    }
    setQuantity(value)
  }

  function showMessage(msg) { 
    setMessage(msg)
    setTimeout(() => {
      setMessage(undefined)
    }, 2500)
  }

  return (
    <div className="w-full h-full px-[32px] py-[32px]">

      { !product &&
        <ScreenLoader />
      }

      { product &&
        <div className='flex flex-row w-full h-full space-x-[48px]'>
          <div className="flex-1 overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none lg:h-[440px]">
                    <img
                    src={product.image}
                    alt={product.image}
                    className="object-contain object-center w-full h-full lg:h-full lg:w-full"
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


            <div className='flex flex-row items-center space-x-4'>
              <RatingBar value={product.rating.rate} />
              <span className='flex flex-row space-x-1 text-sm'>
                <span className='text-indigo-500'>{product.rating.count}</span>
                <span className='text-gray-500'>Reviews</span>
              </span>
            </div>

            <div className='flex flex-row pt-[32px] items-center space-x-3'>
              <button onClick={() => decrement()} className='text-indigo-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <span className='text-xl font-bold text-gray-700'>{ quantity }</span>
              <button onClick={() => increment()} className='text-indigo-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            { message &&
              <AlertComponent message={message} handleClose={() => setMessage(undefined)} />
            }

            <button
              type="button"
              onClick={() => addToCart()}
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