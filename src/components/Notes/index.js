import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState("");
  const [bonusGiven, setBonusGiven] = useState(false); // Состояние для отслеживания, был ли бонус выдан

  // Получаем текущий баланс из Redux состояния
  const totalCoins = useSelector((state) => state.totalCoins);

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

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    if (promoCode === "CAS") {
      dispatch({ type: "APPLY_PROMOCODE", payload: promoCode });
      setMessage("+10,000 totalCoins.");
    } else {
      setMessage("Promo code invalid");
    }
    setPromoCode(""); // Очистка поля ввода после отправки
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000); // Очистка сообщения через 2 секунды

      // Очистка таймера при размонтировании компонента
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    // Проверка, был ли уже выдан бонус при загрузке компонента
    const bonusStatus = localStorage.getItem('bonusGiven');
    setBonusGiven(bonusStatus === 'true');
  }, []);

  // Функция для добавления бонуса после перехода по ссылке
  const handleNavigateToExternalLink = () => {
    if (!bonusGiven) { // Проверяем, был ли уже выдан бонус
      window.location.href = "https://t.me/nft_cookie";

      setTimeout(() => {
        dispatch({ type: "ADD_BONUS", payload: 50000 }); // Увеличение баланса на 50,000
        localStorage.setItem('bonusGiven', 'true'); // Устанавливаем, что бонус выдан
        setBonusGiven(true); // Обновляем состояние
      }, 3000); // Задержка перед выдачей бонуса
    } else {
      window.location.href = "https://t.me/nft_cookie"; // Перенаправление без выдачи бонуса
    }
  };

  return (
    <div className="background-container">
      <div className="notes-container">
        <div className="notes-header">
          <img
            src="https://i.ibb.co/xYvth3F/photo-2024-08-05-18-50-15.jpg"
            alt="Header Image"
            className="header-image"
          />
        </div>

        <button className="navigate__home__btn" onClick={() => navigate("/")}>
          GO BACK {"<"}
        </button>
        <div className="promo-code-container">
          <h1> </h1>
          <form className="promo-code-form" onSubmit={handlePromoCodeSubmit}>
            <input
              type="text"
              value={promoCode}
              onChange={handlePromoCodeChange}
              placeholder="You Promo Code"
              required
            />
            <button type="submit">ACTIVATION</button>
          </form>
          {message && <p className="promo-code-message">{message}</p>}
        </div>

        {/* Отображение текущего баланса */}
        <div className="balance-info">
          <h2>You Coins Balance</h2>
          <p className="balance-coin">
            {formatNumber(totalCoins)}
          </p>
        </div>{/* Кнопка "Задания" */}
        <button 
          className="navigate__quests__btn" 
          onClick={handleNavigateToExternalLink}
          disabled={bonusGiven} // Деактивируем кнопку, если бонус уже выдан
        >
          <div className="rewards-info">
            {bonusGiven ? (
              <span className="reward-text">Bonus Claimed</span>
            ) : (
              <>
                <span className="reward-cookies">+5000 🍪</span>
                <span className="reward-batteries">+500 🔋</span>
              </>
            )}
          </div>
          {bonusGiven ? "Bonus Claimed" : "Subscribe Channel"}
        </button>

        <div className="tasks-text">
          <span className="tasks-textt"> tasks</span>
        </div>
      </div>
    </div>
  );
};

export default Notes;