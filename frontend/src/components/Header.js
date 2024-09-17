import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Website</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><NavLink to={"/"} className="hover:text-blue-200">Home</NavLink></li>
              <li><NavLink to={"/blogs"} className="hover:text-blue-200">Blog</NavLink></li>
              <li><NavLink to={"/logout"} className="hover:text-blue-200">Logout</NavLink></li>
              <li><NavLink to={"/login"} className="hover:text-blue-200">Login</NavLink></li>
              <li><NavLink to={"/register"} className="hover:text-blue-200">Register</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
  )
}
