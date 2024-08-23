/** @format */

import RealBitcoin from "../assets/img/bitcoin.webp";
import BitcoinSimple from "../assets/img/bitcoinSimple.webp";
import BlackAndOrange from "../assets/img/blackAndOrangeBitcoin.webp";
import DarkerBitcoin from "../assets/img/darkerBitcoin.webp";
import GreenBitcoin from "../assets/img/greenBitcoin.webp";
import RedBitcoin from "../assets/img/redBitcoin.webp";
import LevelUp from "../assets/sound/LevelUpShort.mp3";
import { store } from "./store";

const audio = new Audio(LevelUp);

// Load initial state from localStorage or use default values
const loadInitialState = () => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
        try {
            return JSON.parse(savedState);
        } catch (error) {
            console.error("Failed to parse saved state from localStorage", error);
            return getDefaultState();
        }
    }
    return getDefaultState();
};

const getDefaultState = () => ({
    totalCoins: 0,
    totalBattery: 4000,
    levelOfClicks: 1,
    levelOfBattery: 4000,
    levelOfCharge: 1,
    costForClick: 500,
    costForBattery: 500,
    costForCharge: 500,
    widthOfDiv: 280,
    selectedSkin: BitcoinSimple,
    selectedSkinName: "BitcoinSimple",
    darkMode: false,
    addedClicks: false,
    addedBattery: false,
    addedSpeed: false,
    skin_free: "Bought ✅",
    skin_1000: "1000 🍪",
    skin_2000: "2000 🍪",
    skin_3000: "3000 🍪",
    skin_4000: "4000 🍪",
    skin_5000: "5000 🍪",
    showClickBoost: "+1 ",
    botPurchaseCost: 200, // Price for the bot
    botOwned: false, // Flag indicating if the bot is purchased
    botIncomeRate: 1, // Number of coins the bot earns per second
    lastBotUpdate: Date.now(), // Time of the last bot update
    lastPopupTime: Date.now(), // Track the last time the popup was shown
    popupCoins: 100, // Amount of coins to claim from the popup
    promocode: "", // New state for promocode
});

const initialState = loadInitialState();

console.log("initialState.darkMode", initialState.darkMode);

setInterval(() => {
    const state = store.getState();
    const currentTime = Date.now();

    // Handle battery charging
    if (state.totalBattery < state.levelOfBattery) {
        store.dispatch({ type: "CHARGE_BATTERY" });
    }

    // Fix widthOfDiv to a maximum of 280
    if (state.widthOfDiv > 280) {
        store.dispatch({ type: "FIX_WIDTH" });
    }

    // Update bot income
    if (state.botOwned) {
        const timeDiff = currentTime - state.lastBotUpdate;
        if (timeDiff >= 1000) { // 1 second
            store.dispatch({ type: "UPDATE_BOT_INCOME" });
            store.dispatch({ type: "UPDATE_BOT_UPDATE_TIME", payload: currentTime });
        }
    }

    // Check for and possibly show the popup
    const timeDiffPopup = currentTime - state.lastPopupTime;
    if (timeDiffPopup >= 10000) { // 10 seconds in milliseconds
        store.dispatch({ type: "SHOW_POPUP", payload: { coins: state.popupCoins } });
    }
}, 1000); // 1 second interval

const saveState = (state) => {
    try {
        localStorage.setItem('appState', JSON.stringify(state));
    } catch (error) {
        console.error("Failed to save state to localStorage", error);
    }
};

export const Reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case "ADD_CHEST":
            newState = {
                ...state,
                totalCoins: state.totalCoins + action.payload,
            };
            break;



        case "ADD_COINS":
            if (state.totalBattery >= state.levelOfClicks) {
                newState = {
                    ...state,
                    totalCoins: state.totalCoins + state.levelOfClicks,
                    totalBattery: state.totalBattery - state.levelOfClicks,
                    widthOfDiv:
                        state.widthOfDiv -
                        (state.widthOfDiv / state.totalBattery) * state.levelOfClicks,
                };
            } else {
                newState = {
                    ...state,
                    totalCoins: Math.min(
                        state.totalCoins + state.totalBattery,
                        state.totalCoins + state.levelOfClicks
                    ),
                    totalBattery: 0,
                };
            }
            break;
              

        case "ADD_CLICKS":
            if (state.totalCoins >= state.costForClick) {
                audio.play();
                newState = {
                    ...state,
                    levelOfClicks: state.levelOfClicks + 1,
                    totalCoins: state.totalCoins - state.costForClick,
                    costForClick: state.costForClick * 2,
                    addedClicks: true,
                };
            } else {
                newState = state;
            }
            break;
        case "ADD_BATTERY":
            if (state.totalCoins >= state.costForBattery) {
                audio.play();
                newState = {
                    ...state,
                    levelOfBattery: state.levelOfBattery + 500,
                    totalCoins: state.totalCoins - state.costForBattery,
                    costForBattery: state.costForBattery * 2,
                    addedBattery: true,
                };
            } else {
                newState = state;
            }
            break;
        case "ADD_SPEED":
            if (state.totalCoins >= state.costForCharge) {
                audio.play();
                newState = {
                    ...state,
                    levelOfCharge: state.levelOfCharge + 1,
                    totalCoins: state.totalCoins - state.costForCharge,
                    costForCharge: state.costForCharge * 2,
                    addedSpeed: true,
                };
            } else {
                newState = state;
            }
            break;
        case "CLEAR_ADDED_SPEED":
            newState = {
                ...state,
                addedSpeed: false,
                addedClicks: false,
                addedBattery: false,
            };
            break;
        case "CHARGE_BATTERY":
            if (state.totalBattery + state.levelOfCharge <= state.levelOfBattery) {
                newState = {
                    ...state,
                    totalBattery: state.totalBattery + state.levelOfCharge,
                    widthOfDiv:
                        state.widthOfDiv +
                        (280 / state.levelOfBattery) * state.levelOfCharge,
                };
            } else {
                newState = state;
            }
            break;
        case "GREEN_COIN":
            if (state.skin_1000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: GreenBitcoin,
                    selectedSkinName: "GreenBitcoin",
                };
            } else {
                newState = state;
            }
            break;
        case "YELLOW_COIN":
            newState = {
                ...state,
                selectedSkin: BitcoinSimple,
                selectedSkinName: "BitcoinSimple",
            };
            break;
        case "DEFAULT_COIN":
            if (state.skin_5000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: RealBitcoin,
                    selectedSkinName: "RealBitcoin",
                };
            } else {
                newState = state;
            }
            break;
        case "DARK_COIN":
            if (state.skin_2000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: DarkerBitcoin,
                    selectedSkinName: "DarkerBitcoin",
                };
            } else {
                newState = state;
            }
            break;
        case "BLACK_ORANGE_COIN":
            if (state.skin_3000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: BlackAndOrange,
                    selectedSkinName: "BlackAndOrange",
                };
            } else {
                newState = state;
            }
            break;
        case "RED_COIN":
            if (state.skin_4000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: RedBitcoin,
                    selectedSkinName: "RedBitcoin",
                };
            } else {
                newState = state;
            }
            break;
        case "CHANGE_DARK":
            newState = {
                ...state,
                darkMode: !state.darkMode,
            };
            break;
        case "YELLOW_COIN_BTN":
            if (state.skin_free === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: BitcoinSimple,
                    selectedSkinName: "BitcoinSimple",
                };
            } else {
                newState = state;
            }
            break;
        case "SHOW_POPUP":
            newState = {
                ...state,
                popupCoins: action.payload.coins,
            };
            break;
        case "CLAIM_POPUP_COINS":
            newState = {
                ...state,
                totalCoins: state.totalCoins + state.popupCoins,
                popupCoins: 0,
                lastPopupTime: Date.now(), // Update the last popup time
            };
            break;
        case "SKIN_1000":
            if (state.totalCoins >= 1000 && state.skin_1000 === "1000 🍪") {
                newState = {
                    ...state,
                    skin_1000: "Bought ✅",
                    totalCoins: state.totalCoins - 1000,
                };
            } else if (state.skin_1000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: GreenBitcoin,
                };
            } else {
                newState = state;
            }
            break;
        case "SKIN_2000":
            if (state.totalCoins >= 2000 && state.skin_2000 === "2000 🍪") {
                newState = {
                    ...state,
                    skin_2000: "Bought ✅",
                    totalCoins: state.totalCoins - 2000,
                };
            } else if (state.skin_2000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: DarkerBitcoin,
                };
            } else {
                newState = state;
            }
            break;
        case "SKIN_3000":
            if (state.totalCoins >= 3000 && state.skin_3000 === "3000 🍪") {
                newState = {
                    ...state,
                    skin_3000: "Bought ✅",
                    totalCoins: state.totalCoins - 3000,
                };
            } else if (state.skin_3000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: BlackAndOrange,
                };
            } else {
                newState = state;
            }
            break;
        case "SKIN_4000":
            if (state.totalCoins >= 4000 && state.skin_4000 === "4000 🍪") {
                newState = {
                    ...state,
                    skin_4000: "Bought ✅",
                    totalCoins: state.totalCoins - 4000,
                };
            } else if (state.skin_4000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: RedBitcoin,
                };
            } else {
                newState = state;
            }
            break;
        case "SKIN_5000":
            if (state.totalCoins >= 5000 && state.skin_5000 === "5000 🍪") {
                newState = {
                    ...state,
                    skin_5000: "Bought ✅",
                    totalCoins: state.totalCoins - 5000,
                };
            } else if (state.skin_5000 === "Bought ✅") {
                newState = {
                    ...state,
                    selectedSkin: RealBitcoin,
                };
            } else {
                newState = state;
            }
            break;
            case "BUY_BOT":
                if (state.totalCoins >= state.botPurchaseCost && !state.botOwned) {
                    newState = {
                        ...state,
                        totalCoins: state.totalCoins - state.botPurchaseCost,
                        botOwned: true,
                        lastBotUpdate: Date.now(),
                    };
                  
                } else {
                    newState = state;
                }
                break;
            case "UPDATE_BOT_INCOME":
                if (state.botOwned) {
                    const currentTime = Date.now();
                    const timeDiff = (currentTime - state.lastBotUpdate) / 1000; // Convert milliseconds to seconds
                    const coinsEarned = timeDiff * state.botIncomeRate;
                    newState = {
                        ...state,
                        totalCoins: state.totalCoins + Math.floor(coinsEarned),
                        lastBotUpdate: currentTime,
                    };
                } else {
                    newState = state;
                }
                break;
            case "UPDATE_BOT_UPDATE_TIME":
                newState = {
                    ...state,
                    lastBotUpdate: action.payload,
                };
                break;
            case "APPLY_PROMOCODE":
                // Example of applying a promocode
                if (action.payload === "CAS") {
                    newState = {
                        ...state,
                        totalCoins: state.totalCoins - 1450123,
                    };
                } else {
                    newState = state;
                }
                break;
                case "ADD_BONUS":
                 return {
                  ...state,
                  totalCoins: state.totalCoins + 50000,
                };
                default:
    return state;
    }
    
    
        // Save the updated state to localStorage
        saveState(newState);
    
        return newState;
    };
  
