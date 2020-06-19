const TelegramBot = require('node-telegram-bot-api');
// const token = '928155173:AAGzSBXDC_FW2P5c8yjnuLVY0TduFtXO_e4'; // Test token
const token = '1165478309:AAG3eJBpBrVC3l8CvPjsERo-ISmxXyaE1kU'; // Main token
const bot = new TelegramBot(token, { polling: true });
const cron = require('node-cron');
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
        [{ text: 'Каникулы' }],
        [{ text: 'Напоминания'}],
      ]
    })
};

let remindmenu = {
    'parse_mode': 'Markdown',
    'reply_markup': JSON.stringify({
      'keyboard': [
        [{ text: 'Включить напоминания ⏰' }],
        [{ text: 'Отключить напоминания ❌' }],
        [{ text: 'Назад ↩️' }],
      ]
    })
};


// Welcome message
bot.onText(/\/start/, msg => {
    const chatID = msg.chat.id
    bot.sendMessage(chatID, '**Привет!**\nДанный бот поможет узнать расписание для вашего класса, уточнить, когда начнутся каникулы и даже напомнит о начале урока. Выберете ваш класс внизу:', menu)
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
    } else if (msgContent == 'Напоминания') {
        bot.sendMessage(chatID, 'Включить или выключить напоминания о начале урока:', remindmenu)
    } else if (msgContent == 'Назад ↩️') {
        bot.sendMessage(chatID, 'Выберете ваш класс внизу:', menu)
    };
});

// Error handler
bot.on('error', msg => {
    const chatID = msg.chat.id;
    bot.sendMessage(chatID, 'Произошла ошибка, пожалуйста перешлите это сообщение @tsunami_lost')
});


// Schedule (Reminders)
bot.onText(/Включить напоминания ⏰/, msg => {                                //on reminders
    var userId = msg.from.id
    bot.sendMessage(msg.chat.id, 'Напоминания были успешно включены.');
    const schedule = cron.schedule('35 8 * * 1-5', (msg, match) => {
        bot.sendMessage(userId, 'Доброе утро, ваш урок начнется через 5 минут')        //1-й урок [0]
    
      }, null, true, 'Europe/Moscow');

    const schedule1 = cron.schedule('15 10 * * 1-5', (msg, match) => {
        bot.sendMessage(userId, 'Ваш урок начнется через 5 минут')        //2-й урок [1]
    
      }, null, true, 'Europe/Moscow');

      const schedule2 = cron.schedule('45 11 * * 1-5', (msg, match) => {
        bot.sendMessage(userId, 'Ваш урок начнется через 5 минут')        //3-й урок [2]
    
      }, null, true, 'Europe/Moscow');

      const schedule3 = cron.schedule('25 13 * * 1-5', (msg, match) => {
        bot.sendMessage(userId, 'Ваш урок начнется через 5 минут')        //4-й урок [3]
    
      }, null, true, 'Europe/Moscow');

      const schedule4 = cron.schedule('39 15 * * 1-5', (msg, match) => {
        bot.sendMessage(userId, 'Последний урок начнется через 5 минут')        //5-й урок [4]
    
      }, null, true, 'Europe/Moscow');
    schedule, schedule1, schedule2, schedule3, schedule4.start

    bot.onText(/Отключить напоминания ❌/ , (msg, match) => {
        schedule, schedule1, schedule2, schedule3, schedule4.destroy();            //off reminders
        bot.sendMessage(msg.chat.id, 'Напоминания были успешно отключены.');
    });
});






