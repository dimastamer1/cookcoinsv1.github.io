require('dotenv').config(); // Импортируйте dotenv

const { Telegraf } = require('telegraf');

// Используйте переменную окружения для получения токена
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    // Получаем реферальный ID из ссылки
    const referrerId = ctx.startPayload;

    // Отправляем приветственное сообщение
    ctx.reply(`Добро пожаловать! Ваш реферер ID: ${referrerId}`);

    // Если есть реферальный ID, сохраняем его или обрабатываем по логике
    if (referrerId) {
        // Здесь можно добавить код для обработки реферального ID
    }
});

bot.command('link', (ctx) => {
    // Возвращаем реферальную ссылку
    const referralLink = `https://t.me/testergitler_bot?start=${ctx.from.id}`;
    ctx.reply(`Ваша реферальная ссылка: ${referralLink}`);
});

// Запуск бота
bot.launch();
