import React from 'react'

function FloatingButtonLoader() {
    return (
    <button type="button" className="rounded-full h-[48px] w-[48px] flex items-center justify-center bg-white focus:outline-none text-[#3F39B5] transition duration-150 ease-in-out drop-shadow shadow-[#0000001A] cursor-not-allowed" disabled>
      <svg className="w-6 h-6 md:w-8 md:h-8 animate-spin text-[#3F39B5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </button>
  )
}

function LoadingSpinner() {
    return (
    <div>
      <svg className="w-6 h-6 md:w-8 md:h-8 animate-spin text-[#3F39B5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  )
}

function ScreenLoader() { 
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <LoadingSpinner />
      <span className='text-[#5C55E5] text-[16px] md:text-[20px] lg:text-[24px] mt-[16px]'>Loading...</span>
    </div>
  )
}

export { FloatingButtonLoader, LoadingSpinner, ScreenLoader }