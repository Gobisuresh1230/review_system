import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp'
import Home from './components/Pages/Home';
import Ratings from './components/Pages/Ratings';



export default function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home/>} />
        <Route path="/" element={<SignUp/>} />
         <Route path="/:id" element={<Ratings />}/>        
      </Routes>
    </BrowserRouter>
    </div>
  )
}
