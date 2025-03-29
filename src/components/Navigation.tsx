'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-byzantine-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and site title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-byzantine-500 text-xl font-semibold">
                St. John of the Ladder
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-byzantine-400 hover:text-byzantine-500">
                For Inquirers
                <svg className="inline ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md">
                <Link href="/about" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">About Orthodoxy</Link>
                <Link href="/visiting" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Visiting Us</Link>
                <Link href="/beliefs" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">What We Believe</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-byzantine-400 hover:text-byzantine-500">
                For Parishioners
                <svg className="inline ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md">
                <Link href="/schedule" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Service Schedule</Link>
                <Link href="/ministries" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Ministries</Link>
                <Link href="/parish-life" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Parish Life</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-byzantine-400 hover:text-byzantine-500">
                Resources
                <svg className="inline ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md">
                <Link href="/library" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Library</Link>
                <Link href="/prayers" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Prayers</Link>
                <Link href="/educational" className="block px-4 py-2 text-byzantine-400 hover:bg-byzantine-50">Educational</Link>
              </div>
            </div>

            <Link href="/support" className="bg-byzantine-200 text-white px-6 py-2 rounded-md hover:bg-byzantine-300 transition">
              Support
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-byzantine-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/about" className="block px-3 py-2 text-byzantine-400 hover:bg-byzantine-50 rounded-md">For Inquirers</Link>
            <Link href="/parishioners" className="block px-3 py-2 text-byzantine-400 hover:bg-byzantine-50 rounded-md">For Parishioners</Link>
            <Link href="/resources" className="block px-3 py-2 text-byzantine-400 hover:bg-byzantine-50 rounded-md">Resources</Link>
            <Link href="/support" className="block px-3 py-2 bg-byzantine-200 text-white rounded-md">Support</Link>
          </div>
        </div>
      )}
    </nav>
  );
}