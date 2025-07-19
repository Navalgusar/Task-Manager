import React from 'react'
import './App.css'
import StoreProvider from './context/StoreProvider'
import Navigation from './navigation/Navigation'




function App() {
  return (
      <StoreProvider>
        <Navigation/>
      </StoreProvider>

  )
}

export default App
