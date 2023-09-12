import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import logo from '../assets/logo.png'
import { categories } from '../utils/data'
const isNotActiveStyle =
  'flex items-cetner px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  'flex items-cetner px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize'

// const categories = [
//   { name: 'Animals' },
//   { name: 'Gaming' },
//   { name: 'Photography' },
//   { name: 'Wallpapers' },
//   { name: 'Coding' },
// ]

function Sidebar({ user, closeToggle }) {
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false)
    }
  }
  return (
    <div className='flex flex-col justify-between  bg-white h-full overflow-y-scroll w-full hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to={'/'}
          onClick={handleCloseSidebar}
          className='flex px-5 my-6 gap-2 w-190 items-center'
        >
          <img src={logo} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHomeFill />
            Hom
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Discover cateogries
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className='w-8 h-8 rounded-full shadow-sm'
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
        >
          <img
            src={user.image}
            className='w-10 h-10 rounded-full'
            alt='user-profile'
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
