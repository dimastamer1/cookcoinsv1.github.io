/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Info = () => {
  const {
    darkMode,
    totalCoins,
    levelOfClicks,
    levelOfBattery,
    levelOfCharge,
    addedClicks,
    addedBattery,
    addedSpeed,
  } = useSelector(state => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    if (addedSpeed || addedBattery || addedClicks) {
      timeoutId = setTimeout(() => {
        dispatch({ type: "CLEAR_ADDED_SPEED" });
      }, 3000);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [addedSpeed, addedBattery, addedClicks, dispatch]);

  // Функция для форматирования чисел
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
    <div className="info-container">
      <div
        className="infoOfLevelsDisplay"
        style={{ color: darkMode ? "white" : "black", transition: "0.5s" }}
      >
        <p className="totalCoinsDisplay">Balance: {formatNumber(totalCoins)}🍪</p>
        <p className="levelOfClickerDisplay">
          Level of Clicker: {formatNumber(levelOfClicks)}👆{" "}
          <span>{addedClicks ? "+1 👆" : ""}</span>
        </p>
        <p className="levelOfBatteryDisplay">
          Level of Battery: {formatNumber(levelOfBattery)}🔋{" "}
          <span>{addedBattery ? "+500 🔋" : ""}</span>
        </p>
        <p className="levelOfSpeedDisplay">
          Level of Charger: {formatNumber(levelOfCharge)}⚡️{" "}
          <span>{addedSpeed ? "+1 ⚡️" : ""}</span>
        </p>
      </div>

      <button className="navigate__home__btn" onClick={() => navigate("/")}>
        Go back {"<"}
      </button>
      
      {/* Новый элемент для фона */}
      <div className="background-square"></div>
    </div>
  );
};

export default Info;
