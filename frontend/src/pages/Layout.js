import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header/>
      

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet/>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
