'use client'
import Image from 'next/image'
import CartQuantity from '@/components/CartQuantity'
import { useEffect, useState } from 'react';
import { useUserCartStore } from '@/stores/cart';
import Link from 'next/link'

export default function AppHeader(props) { 

    const setCartItems = useUserCartStore(state => state.setItems)

    useEffect(() => { 
        fetchCart()
    }, [])

    function fetchCart() { 
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/user/${process.env.NEXT_PUBLIC_USERID}`)
            .then(res=>res.json())
            .then(json => {
                setCartItems(json)
            })
    }

    return (
        <div className={`w-full flex flex-row h-[80px] items-center justify-between px-[32px] `}>
            
            <Image
              src="/logo.svg"
              alt="Kopto Logo"
              className="text-gray-400"
              width={120}
              height={48}
              priority
            />

            <div className={`flex flex-row items-center space-x-[16px]`}>

              <Link href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
              
              <CartQuantity />
              
            </div>
          </div>
    )

}