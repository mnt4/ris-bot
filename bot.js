const TelegramBot = require('node-telegram-bot-api');
const token = '1165478309:AAG3eJBpBrVC3l8CvPjsERo-ISmxXyaE1kU';
const bot = new TelegramBot(token, { polling: true });
const schedule = require('node-schedule');

// Links array
let scheduleLink = [
    'https://i.imgur.com/it81WD1.png', // 6Y8 [0]
    'https://i.imgur.com/PROIjTb.png', // 7Y9 [1]
    'https://i.imgur.com/MFKsT7e.png', // 8Y10 [2] 
    'https://i.imgur.com/vWHiHvj.png', // 9Y11 [3]
    'https://i.imgur.com/Uvigbqn.jpg' // School breaks [4]
];

// Keyboard Menu
let menu = {
    'parse_mode': 'Markdown',
    'reply_markup': JSON.stringify({
      'keyboard': [
        [{ text: '6Y8' }],
        [{ text: '7Y9' }],
        [{ text: '8Y10' }],
        [{ text: '9Y11' }],
        [{ text: 'Каникулы' }]
      ]
    })
};


// Welcome message
bot.onText(/\/start/, msg => {
    const chatID = msg.chat.id
    bot.sendMessage(chatID, '**Привет!**\nДанный бот поможет узнать расписание для вашего класса и уточнить, когда начнутся каникулы. Выберете ваш класс внизу:', menu)
});


// Menu command handler
bot.on('message', (msg,) => {
    const chatID = msg.chat.id;
    const msgContent = msg.text;

    if (msgContent == '6Y8') {
        bot.sendPhoto(chatID, scheduleLink[0], { caption: `Ваше расписание для ${msgContent} класса` });
    } else if (msgContent == '7Y9') {
        bot.sendPhoto(chatID, scheduleLink[1], { caption: `Ваше расписание для ${msgContent} класса` });
    } else if (msgContent == '8Y10') {
        bot.sendPhoto(chatID, scheduleLink[2], { caption: `Ваше расписание для ${msgContent} класса` });
    } else if (msgContent == '9Y11') {
        bot.sendPhoto(chatID, scheduleLink[3], { caption: `Ваше расписание для ${msgContent} класса` });
    } else if (msgContent == 'Каникулы') {
        bot.sendPhoto(chatID, scheduleLink[4], { caption: `Расписание каникул` });
    };
});

// Error handler
bot.on('error', msg => {
    const chatID = msg.chat.id;
    bot.sendMessage(chatID, 'Произошла ошибка, пожалуйста перешлите это сообщение @tsunami_lost')
});