/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const Miner = () => {
  const darkMode = useSelector(state => state.darkMode);
  const totalCoins = useSelector(state => state.totalCoins);
  const selectedSkin = useSelector(state => state.selectedSkin);
  const totalBattery = useSelector(state => state.totalBattery);
  const widthOfDiv = useSelector(state => state.widthOfDiv);
  const levelOfClicks = useSelector(state => state.levelOfClicks);
  const levelOfCharge = useSelector(state => state.levelOfCharge);
  const dispatch = useDispatch();

  const [bonus, setBonus] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Дебаунсинг состояния

  const handleClick = (event) => {
    // Check if the event is a pointer event and has only one touch point
    if (event.pointerType === 'mouse' || event.pointerType === 'touch') {
      if (!isProcessing) {
        setIsProcessing(true);
        dispatch({ type: "ADD_COINS" });

        // Устанавливаем таймер для сброса обработки клика
        setTimeout(() => {
          setIsProcessing(false);
        }, 10); // Время должно соответствовать CSS-переходу
      }
    }
  };

  useEffect(() => {
    // Таймер для сброса бонуса
    const bonusTimer = setInterval(() => {
      if (bonus) {
        setBonus(false);
      }
    }, 6000);

    return () => clearInterval(bonusTimer);
  }, [bonus]);

  useEffect(() => {
    // Установка бонуса через 6 секунд
    const bonusTimeout = setTimeout(() => {
      setBonus(true);
    }, 6000);

    return () => clearTimeout(bonusTimeout);
  }, []);

  // Функция для форматирования числа
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'; // миллиарды
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // миллионы
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'; // тысячи
    } else {
      return num; // менее 1000
    }
  };

  return (
    <>
      <div
        className="centerItems"
        style={{ color: darkMode ? "white" : "black", transition: "0.5s" }}
      >
        <div className="title">
          <h1> </h1>
          <div className="miner__info">
            <p>
              <b>+{levelOfClicks}🍪</b>
            </p>
            <h2 className="totalCoinsDisplay">{formatNumber(totalCoins)}</h2>
            <p>+{levelOfCharge} ⚡️</p>
          </div>
        </div>
        <div className="mineContainer">
          <img
            className="coin"
            onPointerDown={handleClick} // Используем PointerEvent
            src={selectedSkin}
            alt={"img of bitcoin"}
          />
        </div>

        <h3 className="batteryDisplay"> {totalBattery}🔋</h3>
        <div className="batterySizeBorder">
          <div
            className="batterySizeDisplay"
            style={{ width: widthOfDiv + "px" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Miner;
