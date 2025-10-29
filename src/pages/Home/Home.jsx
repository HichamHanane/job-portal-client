import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero_section/Hero'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../features/AuthSlice';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])


  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  }
  return (
    <div>
      <Header />
      <section >
        <Hero />
      </section>
    </div>
  )
}

export default Home
