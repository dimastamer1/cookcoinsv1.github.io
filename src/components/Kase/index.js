import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import chestAnimation from "../assets/img/chest-animation.gif"; // Импортируйте GIF

const Kase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalCoins = useSelector((state) => state.totalCoins);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false); // Стейт для отображения анимации

  useEffect(() => {
    const lastClickTime = localStorage.getItem("lastChestClickTime");
    if (lastClickTime) {
      const timeDiff = Date.now() - parseInt(lastClickTime, 10);
      const cooldownTime = 0.2 * 60 * 1000; // 12 минут в миллисекундах
      if (timeDiff < cooldownTime) {
        setIsButtonDisabled(true);
        setTimeLeft(cooldownTime - timeDiff);

        const interval = setInterval(() => {
          const newTimeDiff = Date.now() - parseInt(lastClickTime, 10);
          const newTimeLeft = cooldownTime - newTimeDiff;
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            setTimeLeft(0);
          } else {
            setTimeLeft(newTimeLeft);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, []);

  const getRandomBonus = () => {
    const randomValue = Math.random();
    if (randomValue < 0.7) {
      return 1000; // 70% шанс на 1000
    } else if (randomValue < 0.9) {
      return 2000; // 20% шанс на 2000
    } else {
      return 5000; // 10% шанс на 5000
    }
  };

  const handleButtonClick = () => {
    setShowAnimation(true); // Показать анимацию

    setTimeout(() => {
      setShowAnimation(false); // Скрыть анимацию после завершения
      localStorage.setItem("lastChestClickTime", Date.now().toString());
      setIsButtonDisabled(true);

      const randomBonus = getRandomBonus();

      dispatch({
        type: "ADD_CHEST",
        payload: randomBonus,
      });
    }, 2000); // Продолжительность анимации (время в миллисекундах)
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="referral-container">
      {/* Фоновое изображение */}
      <div className="background-image"></div>
      
      <div className="total-coins-display">You Balance: {totalCoins}</div>

      <button className="navigate__home__btn" onClick={() => navigate("/")}>
        GO BACK {"<"}
      </button>
      <div className="spacer" />
      <button
        className="styled-button"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled
          ? `Come back in ${formatTime(timeLeft)}`
          : "OPEN CHESTS"}
      </button>

      {/* Отображение анимации при нажатии на кнопку */}
      {showAnimation && (
        <div className="animation-container">
          <img
            src={chestAnimation}
            alt="Chest Opening Animation"
            className="animation-img"
          />
        </div>
      )}
    </div>
  );
};

export default Kase;
