'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const onToggle = () => setIsOpen(!isOpen)
  const onClose = () => setIsOpen(false)

  const stateStyle = {
    open: 'bg-primary-light/95 dark:bg-primary-dark/95 h-full',
    closed: 'mix-blend-exclusion text-primary-dark',
  }

  const style = isOpen ? 'open' : 'closed'

  return (
    <nav
      className={`${stateStyle[style]} px-5 sm:px-7 lg:px-11 py-5 w-screen flex flex-col fixed top-0 z-10 text-regular-regular lg:text-medium-regular xl:text-large-regular`}
    >
      <div className='flex justify-between md:grid md:gap-7 md:grid-cols-3 lg:grid-cols-8 xl:grid-cols-4'>
        <Link
          href='/'
          onClick={onClose}
          className='lg:col-span-2 xl:col-span-1'
        >
          <h1 className='font-bold'>AKSEL SKAAR &#8482;</h1>
        </Link>
        <div className='flex'>
          <p className='cursor-pointer' onClick={onToggle}>
            {isOpen ? 'CLOSE' : 'MENU'}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className='my-15 flex flex-col justify-between md:justify-normal h-full md:grid md:grid-cols-3 md:gap-7 lg:grid-cols-8 xl:grid-cols-4'>
          <div className='flex flex-col gap-7 md:col-start-2 md:row-start-1 md:col-span-2 lg:col-start-3 xl:col-start-2 text-gray-400'>
            <div className='flex'>
              <Link
                href='/about'
                onClick={onClose}
                className={`${pathname === '/about' && 'text-gray-800'}`}
              >
                About me
              </Link>
            </div>
            <div className='flex'>
              <Link
                href='/contact'
                onClick={onClose}
                className={`${pathname === '/contact' && 'text-gray-800'} flex`}
              >
                Contact me
              </Link>
            </div>
          </div>
          <div className='flex justify-end md:justify-normal md:col-start-3 md:row-start-1 lg:col-start-6 xl:col-start-4'>
            <ThemeSwitch />
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar
