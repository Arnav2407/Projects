import React from 'react'

const navbar = () => {
  return (
    <nav className='w-full h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between px-5 py-8'>
        <div className="logo">
            <span className="text-xl font-bold mx-5">TaskTracker</span>
        </div>
        <ul className='flex space-x-4 mx-5 gap-6'>
            <li className="cursor-pointer hover:font-bold transition-all duration-75">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-75">My Tasks</li>
        </ul>
    </nav>
  )
}

export default navbar
 