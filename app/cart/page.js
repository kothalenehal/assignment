'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useUserCartStore } from '@/stores/cart';
import { ScreenLoader } from '@/components/shared/Loading';
import CartItem from '@/components/CartItem';

export default function CartPage({ params }) { 

    const cartItems = useUserCartStore(state => state.items)

    const reloadCartItems = useUserCartStore(state => state.reloadItems)

    useEffect(() => { 
        reloadCartItems()
    }, [])

    return (
        <div className="w-full h-full px-[32px] py-[32px]">

            { !cartItems.length &&
                <ScreenLoader />
            }

            <div className='flex flex-col w-full space-y-2'>
                {cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))}
            </div>

        </div>
    )


}