import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <CirclesWithBar width={200} height={50} className={'m-5'} color='#00BFFF'/>
    <p className=' capitalize text-lg text-center'>{message}</p>
    </div>
  )
}

export default Spinner
