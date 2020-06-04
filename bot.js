const TelegramBot = require('node-telegram-bot-api');
const token = '1165478309:AAG3eJBpBrVC3l8CvPjsERo-ISmxXyaE1kU';
const bot = new TelegramBot(token, { polling: true });

// Links array
let scheduleLink = [
    'https://i.imgur.com/pKS40JT.jpg', // 6Y8 [0]
    'https://i.imgur.com/Kf0gcLm.jpg', // 7Y9 [1]
    'https://i.imgur.com/d1yIFXh.jpg', // 8Y10 [2] 
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
  
