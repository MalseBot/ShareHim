import React from 'react'
  import Masonry from 'react-masonry-css'
  import Pin from './Pin'
  

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

const MasonryLayout = ({pins}) => {
  return (
    <div><Masonry className='flex animate-slide-fwd' breakpointCols={breakpointColumnsObj}>{pins?.map((pin)=><Pin key={pin.id} pin={pin} className="w-max"/>
    )}</Masonry></div>
  )
}

export default MasonryLayout