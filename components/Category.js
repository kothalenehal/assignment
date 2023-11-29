import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function Category(props) { 

    const [products, setProducts] = useState([])

    useEffect(() => { 
        fetchCategoryProducts()
    }, [])

    const fetchCategoryProducts = async () => { 
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/category/${props.name}`)
            .then(res=>res.json())
            .then(json => { 
                setProducts(json)
            })
    }

    return (
        <div className="flex flex-col items-start w-full space-y-2">

            <div className="flex flex-row items-center justify-between w-full">
                <span className="text-2xl font-medium tracking-tight text-gray-900 first-letter:uppercase ">{props.name}</span>
                <button className="flex flex-row items-center space-x-1 text-sm font-medium text-indigo-700 hover:text-indigo-500">
                    <span>See Everything</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                    src={product.image}
                    alt={product.image}
                    className="object-contain object-center w-full h-full lg:h-full lg:w-full"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </Link>
            ))}
            </div>
            
        </div>
    )

}