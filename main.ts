const TelegramBot = require('node-telegram-bot-api');
import { Message, SendMessageOptions } from "node-telegram-bot-api";
import * as budget from "./budget";

const token = '6627948400:AAHHQXGJFPmrIYE5_qyrpmRc3xl3XMmo4X8'
const bot: typeof TelegramBot = new TelegramBot(token, { polling: true });

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
});

bot.onText(/Check My Balance/, async (msg: Message) => {
    const chatId = msg.chat.id;
    if (msg?.from?.username) {
        await bot.sendMessage(chatId, `Your balance is ${await budget.showBalance(msg?.from?.username)}`);
    }
    else {
        await bot.sendMessage(chatId, `IDK mannnn`);
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
            let description = replyHandler.text.split(" ").splice(1).join(" ");
            await budget.addExpense(username, amount, description);
        }
        await bot.sendMessage(replyHandler.chat.id, `Your balance is ${await budget.showBalance(username)}`, opts);

    });
    bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);

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
            let description = replyHandler.text.split(" ").splice(1).join(" ");
            await budget.addIncome(username, amount, description);
        }
        await bot.sendMessage(replyHandler.chat.id, `Your balance is ${await budget.showBalance(username)}`, opts);

    });
    bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);
});


bot.onText(/Show Transaction/, async (msg: Message) => {
    let username = msg?.from?.username || "";
    let transactions = await budget.showTransaction(username);
    let message = transactions;
    await bot.sendMessage(msg.chat.id, JSON.stringify(message));
});

