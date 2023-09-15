const TelegramBot = require('node-telegram-bot-api');
import { Message, SendMessageOptions } from "node-telegram-bot-api";

import * as budget from "./budget";
import * as http from "http";


const TelegramBot = require('node-telegram-bot-api');
import { Message, SendMessageOptions } from "node-telegram-bot-api";
import * as dotenv from "dotenv";
dotenv.config();

import * as budget from "./budget";
import * as http from "http";

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: false });

const opts: SendMessageOptions = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: "Check My Balance",
                },
            ],
            [
                {
                    text: "Add Income",
                },
                {
                    text: `Add Expense`,
                },
            ],
            [
                {
                    text: "Show Transaction",
                },

            ]
        ],
    },
    parse_mode: "Markdown"
}

bot.onText(/\/start/, async (msg: Message) => {
    const chatId = msg.chat.id;
    if (msg?.from?.username) {
        let username = msg?.from?.username;
        if (await budget.checkUser(username)) {
            await bot.sendMessage(chatId, `Welcome back @${username}`, opts);
            return;
        }
        else {
            await budget.createUser(msg?.from?.username);
            await bot.sendMessage(chatId, `Welcome to your budget tracker ${msg?.from?.username}`, opts);
        }
    }
    else {
        await bot.sendMessage(chatId, `It seems you have not set your username in telgram, please set it and try again`);
    }
});

bot.onText(/Check My Balance/, async (msg: Message) => {
    const chatId = msg.chat.id;
    try {
        if (msg?.from?.username) {
            await bot.sendMessage(chatId, `Your balance is ${await budget.showBalance(msg?.from?.username)}`);
        }
        else {
            await bot.sendMessage(chatId, `You should start with /start`);
        }
    }
    catch {
        await bot.sendMessage(chatId, `You should start with /start`);
    }
});


bot.onText(/Add Expense/, async (msg: Message) => {
    let listenerReply: any;
    let username: string;
    if (msg?.from?.username) {
        username = msg?.from?.username;
    }
    let contentMessage = await bot.sendMessage(msg.chat.id, "Enter the amount and note ", {
        "reply_markup": {
            "force_reply": true
        }
    });
    listenerReply = (async (replyHandler: Message) => {
        bot.removeReplyListener(listenerReply);
        if (replyHandler.text === "/cancel") {
            await bot.sendMessage(replyHandler.chat.id, "Canceled", opts);
            return;
        }
        if (replyHandler?.text) {
            let amount = parseInt(replyHandler.text.split(" ")[0]);
            if (isNaN(amount)) {
                await bot.sendMessage(replyHandler.chat.id, "Please enter a number", opts);
                return;
            }
            let description = replyHandler.text.split(" ").splice(1).join(" ");
            let descriptionMsg = description == "" ? "Expense added with no note" : `Expense has been added with note \`${description}\``
            await budget.addExpense(username, amount, description);

            await bot.sendMessage(replyHandler.chat.id, descriptionMsg, opts);
        }

    });
    await bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);

});

bot.onText(/Add Income/, async (msg: Message) => {
    let listenerReply: any;
    let username: string;
    if (msg?.from?.username) {
        username = msg?.from?.username;
    }
    let contentMessage = await bot.sendMessage(msg.chat.id, "Enter the amount and note ", {
        "reply_markup": {
            "force_reply": true
        }
    });
    listenerReply = (async (replyHandler: Message) => {
        bot.removeReplyListener(listenerReply);
        if (replyHandler.text === "/cancel") {
            await bot.sendMessage(replyHandler.chat.id, "Canceled", opts);
            return;
        }
        if (replyHandler?.text) {
            let amount = parseInt(replyHandler.text.split(" ")[0]);
            if (isNaN(amount)) {
                await bot.sendMessage(replyHandler.chat.id, "Please enter a number", opts);
                return;
            }
            let description = replyHandler.text.split(" ").splice(1).join(" ");
            let descriptionMsg = description == "" ? "Income added with no note" : `Income has been added with note \`${description}\``
            await budget.addIncome(username, amount, description);

            await bot.sendMessage(replyHandler.chat.id, descriptionMsg, opts);
        }
    });
    await bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);
});


bot.onText(/Show Transaction/, async (msg: Message) => {
    let username = msg?.from?.username ? msg?.from?.username : "";
    try {
        if (username === "") {
            await bot.sendMessage(msg.chat.id, "You should start with /start");
        }
        else {
            let transactions = await budget.showTransaction(username);
            let message = transactions;
            await bot.sendMessage(msg.chat.id, JSON.stringify(message));
        }
    }
    catch {
        await bot.sendMessage(msg.chat.id, "You have not entered any transaction yet");
    }
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('https://t.me/coolbudgetbot');
  });

server.listen(8080, '0.0.0.0',bot.startPolling());const token = TOKEN;
const bot = new TelegramBot(token, { polling: false });

const opts: SendMessageOptions = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: "Check My Balance",
                },
            ],
            [
                {
                    text: "Add Income",
                },
                {
                    text: `Add Expense`,
                },
            ],
            [
                {
                    text: "Show Transaction",
                },

            ]
        ],
    },
    parse_mode: "Markdown"
}

bot.onText(/\/start/, async (msg: Message) => {
    const chatId = msg.chat.id;
    if (msg?.from?.username) {
        let username = msg?.from?.username;
        if (await budget.checkUser(username)) {
            await bot.sendMessage(chatId, `Welcome back @${username}`, opts);
            return;
        }
        else {
            await budget.createUser(msg?.from?.username);
            await bot.sendMessage(chatId, `Welcome to your budget tracker ${msg?.from?.username}`, opts);
        }
    }
    else {
        await bot.sendMessage(chatId, `It seems you have not set your username in telgram, please set it and try again`);
    }
});

bot.onText(/Check My Balance/, async (msg: Message) => {
    const chatId = msg.chat.id;
    try {
        if (msg?.from?.username) {
            await bot.sendMessage(chatId, `Your balance is ${await budget.showBalance(msg?.from?.username)}`);
        }
        else {
            await bot.sendMessage(chatId, `You should start with /start`);
        }
    }
    catch {
        await bot.sendMessage(chatId, `You should start with /start`);
    }
});


bot.onText(/Add Expense/, async (msg: Message) => {
    let listenerReply: any;
    let username: string;
    if (msg?.from?.username) {
        username = msg?.from?.username;
    }
    let contentMessage = await bot.sendMessage(msg.chat.id, "Enter the amount and note ", {
        "reply_markup": {
            "force_reply": true
        }
    });
    listenerReply = (async (replyHandler: Message) => {
        bot.removeReplyListener(listenerReply);
        if (replyHandler.text === "/cancel") {
            await bot.sendMessage(replyHandler.chat.id, "Canceled", opts);
            return;
        }
        if (replyHandler?.text) {
            let amount = parseInt(replyHandler.text.split(" ")[0]);
            if (isNaN(amount)) {
                await bot.sendMessage(replyHandler.chat.id, "Please enter a number", opts);
                return;
            }
            let description = replyHandler.text.split(" ").splice(1).join(" ");
            let descriptionMsg = description == "" ? "Expense added with no note" : `Expense has been added with note \`${description}\``
            await budget.addExpense(username, amount, description);

            await bot.sendMessage(replyHandler.chat.id, descriptionMsg, opts);
        }

    });
    await bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);

});

bot.onText(/Add Income/, async (msg: Message) => {
    let listenerReply: any;
    let username: string;
    if (msg?.from?.username) {
        username = msg?.from?.username;
    }
    let contentMessage = await bot.sendMessage(msg.chat.id, "Enter the amount and note ", {
        "reply_markup": {
            "force_reply": true
        }
    });
    listenerReply = (async (replyHandler: Message) => {
        bot.removeReplyListener(listenerReply);
        if (replyHandler.text === "/cancel") {
            await bot.sendMessage(replyHandler.chat.id, "Canceled", opts);
            return;
        }
        if (replyHandler?.text) {
            let amount = parseInt(replyHandler.text.split(" ")[0]);
            if (isNaN(amount)) {
                await bot.sendMessage(replyHandler.chat.id, "Please enter a number", opts);
                return;
            }
            let description = replyHandler.text.split(" ").splice(1).join(" ");
            let descriptionMsg = description == "" ? "Income added with no note" : `Income has been added with note \`${description}\``
            await budget.addIncome(username, amount, description);

            await bot.sendMessage(replyHandler.chat.id, descriptionMsg, opts);
        }
    });
    await bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);
});


bot.onText(/Show Transaction/, async (msg: Message) => {
    let username = msg?.from?.username ? msg?.from?.username : "";
    try {
        if (username === "") {
            await bot.sendMessage(msg.chat.id, "You should start with /start");
        }
        else {
            let transactions = await budget.showTransaction(username);
            let message = transactions;
            await bot.sendMessage(msg.chat.id, JSON.stringify(message));
        }
    }
    catch {
        await bot.sendMessage(msg.chat.id, "You have not entered any transaction yet");
    }
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('https://t.me/coolbudgetbot');
  });

server.listen(8080, '0.0.0.0',bot.startPolling());