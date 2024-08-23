import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaInfoCircle, FaCookie, FaGift, FaPalette, FaUser, FaKey, FaToolbox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Boost from '../Boost';
import InfoAndSkins from '../Info';
import Skins from '../Skins/Skins';
import Miner from './Miner';
import './style.scss';

const Home = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  // Local state for managing click messages
  const [messages, setMessages] = useState([]);

  const handleClick = (event) => {
    if (event.target.tagName === 'IMG') {
      const { clientX, clientY } = event;
      const increaseAmount = state.levelOfClicks || 0; // Используйте актуальное значение из состояния
      const newMessage = {
        id: Date.now(), // Уникальный идентификатор для каждого сообщения
        x: clientX,
        y: clientY,
        text: `${increaseAmount}` // Используйте обратные кавычки для шаблонной строки
      };

      // Добавляем новое сообщение в список
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Таймер для удаления сообщения из списка через 2 секунды
      setTimeout(() => {
        setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== newMessage.id));
      }, 2000);
    }
  };


  return (
    <div className="container">
      <button className="top-button" onClick={() => navigate('/kase')}>
        <FaToolbox /> DAILY CHESTS <FaKey />
      </button>
      <div className="hero">
        <div className="hero__mobile__hide">
          <InfoAndSkins />
          <Skins />
        </div>
        {/* Обработчик кликов добавлен только к компоненту Miner */}
        <div onClick={handleClick}>
          <Miner />
        </div>
        <div className="hero__mobile__hide">
          <Boost />
        </div>
      </div>
      <div className="hero__mobile">
        <div className="hero__mobile__nav">
          <button onClick={() => navigate('/info')}>
            <FaInfoCircle /> INFO
          </button>
          <button onClick={() => navigate('/skins')}>
            <FaPalette /> SKINS
          </button>
          <button onClick={() => navigate('/boost')}>
            <FaCookie /> BOOST
          </button>
          <button onClick={() => navigate('/notes')}>
            <FaGift /> TAKS
          </button>
          <button onClick={() => navigate('/referral')}>
            <FaUser /> REF
          </button>
        </div>
      </div>
      {/* Show click boost messages at the click position */}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="click-boost-message"
          style={{
            left: `${msg.x}px`, // Используйте обратные кавычки для вставки переменной
            top: `${msg.y}px`, // Используйте обратные кавычки для вставки переменной
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Home;
