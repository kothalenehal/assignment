import { LoadingSpinner } from "./shared/Loading"
import { useEffect, useState } from 'react';

export default function CartItem(props) { 

    const [product, setProduct] = useState()

    const [loading, setLoading] = useState(false)

    const productID = props.item.products[0].productId

    const [quantity, setQuantity] = useState(props.item.products[0].quantity)

    useEffect(() => { 
        fetchProduct()
    }, [])

    function fetchProduct() { 
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${productID}`)
            .then(res=>res.json())
            .then(json => {
                setProduct(json)
            })
    }

    function increment() { 
        var value = quantity + 1
        if (value > 5) { 
        value = 5
        }
        setQuantity(value)
        onChangedQuantity(value)
    }

    function decrement() { 
        var value = quantity - 1
        if (value <= 1) { 
        value = 1
        }
        setQuantity(value)
        onChangedQuantity(value)
    }

    function onRemove() { 
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/${props.item.id}`,{
            method:"DELETE"
        })
        .then(res => res.json())
            .then(json => {
                console.log(json)
            setLoading(false)
        })
    }

    function onChangedQuantity(quantity) { 
        setLoading(true)
        var body = JSON.parse(JSON.stringify(props.item))
        body.products[0].quantity = quantity
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/${props.item.id}`,{
            method:"PUT",
            body:JSON.stringify(body)
        })
            .then(res=>res.json())
            .then(json => {
                console.log(json)
                setLoading(false)
            })
    }

    return (
        
        <>
        { product &&
            <div className="flex flex-row space-x-4">
                 <div className="w-[240px] overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none lg:h-[240px]">
                        <img
                        src={product.image}
                        alt={product.image}
                        className="object-contain object-center w-full h-full lg:h-full lg:w-full"
                        />
                    </div>   
                    
                    <div className="flex flex-col items-start flex-1 space-y-3">
                        <span className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                        {product.title}
                        </span>
                        <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

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

                            { loading &&
                                <LoadingSpinner />
                            }

                        </div>

                        <button
                            type="button"
                            onClick={() => onRemove()}
                            className="px-2 py-1 text-xs font-semibold text-red-600 rounded shadow-sm bg-red-50 hover:bg-red-100"
                        >
                            Remove
                        </button>

                    </div>

            </div>
        }
        </>

    )


}