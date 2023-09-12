import React, { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  // const responseGoogle=(response)=>{
  // }

  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
          const { name, id, picture } = res.data
          const doc = {
            _id: id,
            _type: 'user',
            userName: name,
            image: picture,
          }
          client.createIfNotExists(doc).then(() => {
            navigate('/')
          })
          console.log(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  return (
    <div className=' flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          autoPlay
          muted
          controls={false}
          className='w-full h-full object-cover'
        ></video>
        <div className=' absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
          <div className='p-5 flex items-center flex-col'>
            <img src={logo} width={130} alt='logo' />
            <div className='shadow-2xl mt-3'>
              <button onClick={() => login()}>Sign in with Google 🚀 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
