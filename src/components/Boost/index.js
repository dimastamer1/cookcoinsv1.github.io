/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Boost = () => {
  const totalCoins = useSelector((state) => state.totalCoins);
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const costForClick = useSelector((state) => state.costForClick);
  const costForBattery = useSelector((state) => state.costForBattery);
  const costForCharge = useSelector((state) => state.costForCharge);
  const botPurchaseCost = useSelector((state) => state.botPurchaseCost);
  const botOwned = useSelector((state) => state.botOwned);

  const navigate = useNavigate();

  // Функция для форматирования чисел
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B"; // миллиарды
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // миллионы
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"; // тысячи
    } else {
      return num; // менее 1000
    }
  };

  return (
    <>
      <div
        className="button-container"
        style={{ color: darkMode ? "white" : "black", transition: "0.5s" }}
      >
        <button className="navigate__home__btn" onClick={() => navigate("/")}>
          GO BACK {"<"}
        </button>

        <h1 className="total-coins">{formatNumber(totalCoins)} 🍪</h1>

        <div className="daily-boosters">
          <div className="booster-status">
            <span role="img" aria-label="fire">🔥</span> Taping Guru 3/3
          </div>
          <div className="booster-status">
            <span role="img" aria-label="lightning">⚡️</span> Full Tank 3/3
          </div>
        </div>

        <div className="booster-item">
          <div className="emoji-container">👆</div>
          <p className="booster-title">Multitap</p>
          <button
            className="booster-button"
            onClick={() => dispatch({ type: "ADD_CLICKS" })}
          >
            {formatNumber(costForClick)} 🍪
          </button>
        </div>

        <div className="booster-item">
          <div className="emoji-container">🔋</div>
          <p className="booster-title">Energy Limit</p>
          <button
            className="booster-button"
            onClick={() => dispatch({ type: "ADD_BATTERY" })}
          >
            {formatNumber(costForBattery)} 🍪
          </button>
        </div>

        <div className="booster-item">
          <div className="emoji-container">⚡️</div>
          <p className="booster-title">Recharging speed</p>
          <button
            className="booster-button"
            onClick={() => dispatch({ type: "ADD_SPEED" })}
          >
            {formatNumber(costForCharge)} 🍪
          </button>
        </div>

        <div className="booster-item">
          <div className="emoji-container">🤖</div>
          <p className="booster-title">
            {botOwned ? "Tap bot (Purchased ✅)" : "Tap bot"}
          </p>
          <button
            className="booster-button"
            onClick={() => dispatch({ type: "BUY_BOT" })}
            disabled={totalCoins < botPurchaseCost || botOwned}
          >
            {botOwned ? "Bought" : "Buy Bot"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Boost;