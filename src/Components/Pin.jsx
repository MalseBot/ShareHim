import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { urlFor, client } from '../client'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false)

  const navigate = useNavigate()

  const user = fetchUser()
  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user?.id)
    ?.length

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user.id,
            postedBy: {
              _type: 'postedBy',
              _ref: user.id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload()
        })
    }
  }
  const deletePin = (id) => {
    client.delete(id).then(window.location.reload())
  }

  const location = useLocation()
  console.log(location)
  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          navigate(`pin-detail/${_id}`)
        }}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img
          src={urlFor(image).width(250).url()}
          className='rounded-lg w-full'
          alt=''
        />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 cursor-pointer'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className=' bg-white w-9 h-9 rounded-full flex items-center justify-center text-black text-lg opacity-75 hover:opacity-100 hover:shadow-md outline-none '
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  className=' bg-red-500 opacity-75 hover:opacity-100 text-white px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none cursor-pointer '
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  // something wrong with save fn
                  onClick={(e) => {
                    e.stopPropagation()
                    savePin(_id)
                  }}
                  type='button'
                  className=' bg-red-500 opacity-75 hover:opacity-100 text-white px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none cursor-pointer '
                >
                  Save
                </button>
              )}
            </div>
            <div className='flex justify-between items-center w-full gap-2'>
              {destination && (
                <a
                  href={destination}
                  rel='noreferrer'
                  target='blank'
                  className=' bg-white flex items-center gap-2 font-bold text-black p-2 px-4 rounede-full opacity-75 hover:opacity-100 hover:shadow-md'
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 25
                    ? destination.slice(11, 25)
                    : destination.slice(11)}
                </a>
              )}
              {postedBy?._id === user.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                  type='button'
                  className=' bg-white p-2 opacity-75 hover:opacity-100 text-black  text-base rounded-3xl hover:shadow-md outline-none cursor-pointer '
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className='flex gap-2 items-center'
      >
        <img
          src={postedBy?.image}
          className=' w-8 h-8 rounded-full object-cover'
          alt='user-profile'
        />
        <p className=' font-semibold '>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin
