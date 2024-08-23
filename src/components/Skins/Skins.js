import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RealBitcoin from "../assets/img/bitcoin.webp";
import BitcoinSimple from "../assets/img/bitcoinSimple.webp";
import BlackAndOrange from "../assets/img/blackAndOrangeBitcoin.webp";
import DarkerBitcoin from "../assets/img/darkerBitcoin.webp";
import GreenBitcoin from "../assets/img/greenBitcoin.webp";
import RedBitcoin from "../assets/img/redBitcoin.webp";
import "./style.scss";

const Skins = () => {
  const {
    darkMode,
    totalCoins,
    skin_1000,
    skin_2000,
    skin_3000,
    skin_4000,
    skin_5000,
    selectedSkinName,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSkin, setCurrentSkin] = useState("");

  useEffect(() => {
    const storedSkin = localStorage.getItem("selectedSkin");
    if (storedSkin) {
      setCurrentSkin(storedSkin);
    } else {
      setCurrentSkin(selectedSkinName);
    }
  }, [selectedSkinName]);

  useEffect(() => {
    localStorage.setItem("selectedSkin", currentSkin);
  }, [currentSkin]);

  useEffect(() => {
    const skinSelector = document.querySelector(".skin-selector");
    skinSelector.classList.add("no-scroll");

    return () => {
      skinSelector.classList.remove("no-scroll");
    };
  }, []);

  const handleSkinClick = (type, skinName) => {
    dispatch({ type });
    setCurrentSkin(skinName);
  };

  return (
    <div
      style={{
        color: darkMode ? "white" : "#222",
        textAlign: "start",
      }}
    >
      <h1 className="header-margin">You Skins</h1>
      <div className="skin-selector">
        <div className={`skin-item ${currentSkin === "BitcoinSimple" ? "selected-skin" : ""}`}>
          <div className="skin-info">
            <img src={BitcoinSimple} alt="simpleBitcoin" />
            <div>
              <div className="skin-name">BitcoinSimple</div>
              <div className="skin-ownership">You own it</div>
            </div>
          </div>
          <button
            className="buySkinButton"
            onClick={() => handleSkinClick("YELLOW_COIN_BTN", "BitcoinSimple")}
          >
            Bought ✅
          </button>
        </div>

        <div className={`skin-item ${currentSkin === "GreenBitcoin" ? "selected-skin" : ""}`}>
          <div className="skin-info">
            <img src={GreenBitcoin} alt="green Bitcoin" />
            <div>
              <div className="skin-name">GreenBitcoin</div>
              <div className="skin-ownership">You own it</div>
            </div>
          </div>
          <button
            className="buySkinButton"
            onClick={() => handleSkinClick("SKIN_1000", "GreenBitcoin")}
          >
            {skin_1000}
          </button>
        </div>

        <div className={`skin-item ${currentSkin === "DarkerBitcoin" ? "selected-skin" : ""}`}>
          <div className="skin-info">
            <img src={DarkerBitcoin} alt="dark Bitcoin" />
            <div>
              <div className="skin-name">DarkerBitcoin</div>
              <div className="skin-ownership">You own it</div>
            </div>
          </div>
          <button
            className="buySkinButton"
            disabled={skin_2000 < totalCoins}
            onClick={() => handleSkinClick("SKIN_2000", "DarkerBitcoin")}
          >
            {skin_2000}
          </button>
        </div>

        <div className={`skin-item ${currentSkin === "BlackAndOrange" ? "selected-skin" : ""}`}>
          <div className="skin-info">
            <img src={BlackAndOrange} alt="black and orange Bitcoin" />
            <div>
              <div className="skin-name">BlackAndOrange</div>
              <div className="skin-ownership">You own it</div>
            </div>
          </div>
          <button
            className="buySkinButton"
            onClick={() => handleSkinClick("SKIN_3000", "BlackAndOrange")}
          >
            {skin_3000}
          </button>
        </div>

        <div className={`skin-item ${currentSkin === "RedBitcoin" ? "selected-skin" : ""}`}>
          <div className="skin-info">
            <img src={RedBitcoin} alt="red Bitcoin" />
            <div>
              <div className="skin-name">RedBitcoin</div>
              <div className="skin-ownership">You own it</div>
            </div>
          </div>
          <button
            className="buySkinButton"
            onClick={() => handleSkinClick("SKIN_4000", "RedBitcoin")}
          >
            {skin_4000}
          </button>
        </div>

        <div className={`skin-item ${currentSkin === "RealBitcoin" ? "selected-skin" : ""}`}>
          <div className="skin-info">
            <img src={RealBitcoin} alt="Bitcoin" />
            <div>
              <div className="skin-name">RealBitcoin</div>
              <div className="skin-ownership">You own it</div>
            </div>
          </div>
          <button
            className="buySkinButton"
            onClick={() => handleSkinClick("SKIN_5000", "RealBitcoin")}
          >
            {skin_5000}
          </button>
        </div>
      </div>
      <button className="navigate__home__btn" onClick={() => navigate("/")}>
        GO BACK {"<"}
      </button>
    </div>
  );
};

export default Skins;
