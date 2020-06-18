const TelegramBot = require('node-telegram-bot-api');
const token = '928155173:AAGzSBXDC_FW2P5c8yjnuLVY0TduFtXO_e4';
const bot = new TelegramBot(token, { polling: true });
const schedule = require('node-schedule');

// Links array
let scheduleLink = [
    'https://i.imgur.com/pKS40JT.jpg', // 6Y8 [0]
    'https://i.imgur.com/Kf0gcLm.jpg', // 7Y9 [1]
    'https://i.imgur.com/d1yIFXh.jpg', // 8Y10 [2] 
    'imgur.com', // 9Y11 [3]
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

bot.onText(/\/menu/, (msg, match) => {
    bot.sendMessage(msg.chat.id, 'Выберите ваш класс:', menu);
});

// Menu command handler
bot.on('message', (msg, match) => {
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

// Schedule (Reminders)

//var rule = new schedule.RecurrenceRule();
//rule.dayOfWeek = [0, new schedule.Range(2, 6)];
//rule.hour = 14;
//rule.minute = 15;

//schedule.scheduleJob(rule, function(msg){
//    const ChatID = msg.chat.id;
//    bot.sendMessage(ChatID, 'test')
//});

//schedule.scheduleJob({hour: 14, minute: 20, dayOfWeek: 4}, function(msg) {
 //   console.log(msg)
 //   const chatID = msg.chat.id;
 //   bot.sendMessage(chatID, 'a')
 // });


//var notes = [];

//bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
//    var userId = msg.from.id;
//    var text = match[1];
//    var time = match[2];

//    notes.push({ 'uid': userId, 'time': time, 'text': text });

//    bot.sendMessage(userId, 'Отлично! Я обязательно напомню');
//});

//setInterval(function(){
//    for (var i = 0; i < notes.length; i++) {
//    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
//    if (notes[i]['time'] === curDate) {
//      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
//      notes.splice(i, 1);
//    }
//  }
//}, 1000);
