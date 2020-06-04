const TelegramBot = require('node-telegram-bot-api');
const token = '1165478309:AAG3eJBpBrVC3l8CvPjsERo-ISmxXyaE1kU';
const bot = new TelegramBot(token, { polling: true });

// Links array
let scheduleLink = [
    'https://imgur.com/a/hock87f', // 6Y8 [0]
    'https://imgur.com/a/9rh6uod', // 7Y9 [1]
    'https://imgur.com/a/WdFNtw7', // 8Y10 [2] 
    'imgur.com', // 9Y11 [3]
    'https://i.imgur.com/Uvigbqn.jpg' // School breaks [4]
];

// Schedules
bot.onText(/\/schedule (.+)/, (msg, match) => {
    const chatID = msg.chat.id;
    const scheduleYear = match[1];

    if (scheduleYear == 6) {
        bot.sendPhoto(chatID, scheduleLink[0], { caption: `Ваше расписание для ${scheduleYear} класса` });
    } else if (scheduleYear == 7) {
        bot.sendPhoto(chatID, scheduleLink[1], { caption: `Ваше расписание для ${scheduleYear} класса` });
    } else if (scheduleYear == 8) {
        bot.sendPhoto(chatID, scheduleLink[2], { caption: `Ваше расписание для ${scheduleYear} класса` });
    } else if (scheduleYear == 9) {
        bot.sendPhoto(chatID, scheduleLink[3], { caption: `Ваше расписание для ${scheduleYear} класса` });
    }
});

// School Calendar
bot.onText(/\/breaks/, (msg) => {
    const chatID = msg.chat.id;

    bot.sendPhoto(chatID, scheduleLink[4], { caption: `Расписание каникул` });
});

// INLINE Keyboard
var options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '6Y8', callback_data: '6' }],
            [{ text: '7Y9', callback_data: '7' }],
            [{ text: '8Y10', callback_data: '8' }]
            [{ text: '9Y11', callback_data: '9' }]
            [{ text: 'Каникулы', callback_data: 'Holidays' }]
        ]
    })
};

bot.onText(/\/calendar/, function(msg, match) {
    bot.sendMessage(msg.chat.id, 'Выберите любую кнопку:', options);
});