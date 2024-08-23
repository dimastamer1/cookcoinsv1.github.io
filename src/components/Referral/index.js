import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './style.scss'; // Стили для компонента

const Referral = () => {
    const [telegramId, setTelegramId] = useState(null);
    const [referrerId, setReferrerId] = useState(null);
    const [referralLink, setReferralLink] = useState(''); // Состояние для ссылки
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const navigate = useNavigate();

    useEffect(() => {
        if (window.TelegramWebApp) {
            const webApp = window.TelegramWebApp;
            webApp.ready();

            console.log('Telegram WebApp initialized');

            // Получаем данные пользователя
            const user = webApp.initDataUnsafe?.user;
            if (user) {
                console.log('User data:', user);
                setTelegramId(user.id);
            } else {
                console.log('User data not available');
            }

            // Получаем данные из URL реферальной ссылки
            const urlParams = new URLSearchParams(window.location.search);
            const referrer = urlParams.get('referrer');
            if (referrer) {
                console.log('Referrer ID:', referrer);
                setReferrerId(referrer);
            } else {
                console.log('Referrer ID not found in URL');
            }
        } else {
            console.log('Telegram WebApp not detected');
            setLoading(false); // Если WebApp не найден, устанавливаем состояние загрузки в false
        }
    }, []);

    // Функция для регистрации пользователя в Supabase
    const registerUser = async (telegramId, referrerId = null) => {
        console.log('Registering user with Telegram ID:', telegramId);
        
        let { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', telegramId)
            .single();
        
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
        
        if (!user) {
            // Если пользователь не существует, создаем его
            let { data, error } = await supabase
                .from('users')
                .insert([{ telegram_id: telegramId, referrer_id: referrerId, total_coins: 5000 }])
                .single();

            if (error) {
                console.error('Error inserting user:', error);
                return null;
            }

            // Обновляем данные реферала, если он существует
            if (referrerId) {
                await supabase
                    .from('referrals')
                    .insert([{ user_id: data.id, referrer_id: referrerId }]);

                await supabase
                    .from('users')
                    .update({ total_coins: supabase.raw('total_coins + 5000') })
                    .eq('id', referrerId);
            }

            return data;
        } else {
            return user;
        }
    };

    // Получаем реферальную ссылку
    const getReferralLink = (userId) => {
        const botUsername = "testergitler_bot"; // Имя вашего бота
        return `https://t.me/${botUsername}?start=${userId}`;
    };

    useEffect(() => {
        if (telegramId) {
            registerUser(telegramId, referrerId).then(user => {
                if (user) {
                    console.log('User registered:', user);
                    const link = getReferralLink(user.id);
                    setReferralLink(link);
                    console.log('Your referral link:', link);
                } else {
                    console.error('User registration failed');
                }
                setLoading(false);
            }).catch(error => {
                console.error('Error in registration process:', error);
                setLoading(false);
            });
        }
    }, [telegramId, referrerId]);

    // Функция для копирования ссылки в буфер обмена
    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied to clipboard!');
    };

    return (
        <div className="referral-container">
            <button className="navigate__home__btn" onClick={() => navigate("/")}>
                GO BACK {"<"}
            </button>
            <h1>Referral Page</h1>
            {loading ? (
                <p>Loading your referral link...</p>
            ) : (
                <div className="referral-link-container">
                    <p>Your referral link:</p>
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="referral-link-input"
                    />
                    <button onClick={copyToClipboard} className="copy-link-btn">
                        Copy Link
                    </button>
                </div>
            )}
        </div>
    );
};

export default Referral;
