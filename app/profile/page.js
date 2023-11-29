'use client'
import { ScreenLoader } from "@/components/shared/Loading";
import { useState, useEffect } from "react";

export default function ProfilePage({ params }) { 

    const [profile, setProfile] = useState()

    useEffect(() => { 
        fetchProfile()
    }, [])

    function fetchProfile() { 
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${process.env.NEXT_PUBLIC_USERID}`)
            .then(res=>res.json())
            .then(json => {
                setProfile(json)
            })
    }

    return (
        <div className="w-full h-full px-[32px] py-[32px]">

            {!profile &&
                <ScreenLoader />
            }

            { profile &&
                <div className='flex flex-col w-full space-y-2'>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Profile</h3>
                        <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">Personal details.</p>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{ profile.name.firstname + profile.name.lastname }</span>
                        <span className="flex-shrink-0 ml-4">
                            <button type="button" className="font-medium text-indigo-600 rounded-md hover:text-indigo-500">
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
                        <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{ profile.username }</span>
                        <span className="flex-shrink-0 ml-4">
                            <button type="button" className="font-medium text-indigo-600 rounded-md hover:text-indigo-500">
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">{ profile.email }</span>
                        <span className="flex-shrink-0 ml-4">
                            <button type="button" className="font-medium text-indigo-600 rounded-md hover:text-indigo-500">
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
                        <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{ profile.phone }</span>
                        <span className="flex-shrink-0 ml-4">
                            <button type="button" className="font-medium text-indigo-600 rounded-md hover:text-indigo-500">
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                        <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">
                            {
                                profile.address.street + '\n' + profile.address.city + '\n' + profile.address.zipcode                
                            }
                        </span>
                        <span className="flex-shrink-0 ml-4">
                            <button type="button" className="font-medium text-indigo-600 rounded-md hover:text-indigo-500">
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    </dl>
                    </div>
                </div>
            }

            

        </div>
    )

}