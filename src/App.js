/** @format */

import React, { useEffect } from "react"

import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import "./App.scss"
import Boost from "./components/Boost"
import Home from "./components/Home"
import DarkMode from "./components/Home/DarkMode/DarkMode"
import Info from "./components/Info"
import Skins from "./components/Skins/Skins"
import Notes from "./components/Notes/index.js"
import Referral from "./components/Referral"
import Kase from "./components/Kase/index.js"

function App() {
  const darkMode = useSelector(state => state.darkMode)

  const body = () => {
    if (darkMode) {
      document.body.style.backgroundImage = "none"; // Убираем градиент
      document.body.style.backgroundColor = "#222"; // Устанавливаем однотонный цвет для темного режима
    } else {
      document.body.style.backgroundImage = "radial-gradient(circle at 9.44% 107.92%, #ffffff 0%, #ffffff 4.55%, #ffffff 9.09%, #fffffe 13.64%, #fffffa 18.18%, #fffff6 22.73%, #fafff2 27.27%, #f0ffed 31.82%, #e4ffe9 36.36%, #d6fde5 40.91%, #c7f8e1 45.45%, #b5f2de 50%, #a2ecdc 54.55%, #90e7dd 59.09%, #7fe1df 63.64%, #6edde2 68.18%, #5fd8e6 72.73%, #54d4eb 77.27%, #4cd0f0 81.82%, #4bccf5 86.36%, #50c8f9 90.91%, #5bc5fc 95.45%, #69c2ff 100%)";
      document.body.style.backgroundColor = "#00FFFF";
    }
    document.body.style.transition = "background 1s"; // Плавное изменение фона
  }
  

  useEffect(() => {
    body()
  }, [darkMode])

  return (
    <div className="App">
      <DarkMode />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boost" element={<Boost />} />
        <Route path="/info" element={<Info />} />
        <Route path="/skins" element={<Skins />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/kase" element={<Kase />} />
      </Routes>
    </div>
  )
}

export default App