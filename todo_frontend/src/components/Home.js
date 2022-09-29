import React from 'react'
import Navbar from './nav/Navbar'
import Todolist from './todo/Todolist'

function Home() {
  return (
    <div>
      <Navbar />
      <Todolist />
    </div>
  )
}

export default Home