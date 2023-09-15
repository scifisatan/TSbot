"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require('node-telegram-bot-api');
var budget = require("./budget");
var http = require("http");
var DEV_TOKEN = '6572699348:AAHlp4wUlTVDvx89z8lWHG0-eNKY-WyUwu8';
var PROD_TOKEN = '6627948400:AAFQJlbPYjmFhqWzkg0ZTlv0IIWrz2o3BRk';
var token = DEV_TOKEN;
var bot = new TelegramBot(token, { polling: false });
var opts = {
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
                    text: "Add Expense",
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
};
bot.onText(/\/start/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, username;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                chatId = msg.chat.id;
                if (!((_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.username)) return [3 /*break*/, 7];
                username = (_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.username;
                return [4 /*yield*/, budget.checkUser(username)];
            case 1:
                if (!_e.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, bot.sendMessage(chatId, "Welcome back @".concat(username), opts)];
            case 2:
                _e.sent();
                return [2 /*return*/];
            case 3: return [4 /*yield*/, budget.createUser((_c = msg === null || msg === void 0 ? void 0 : msg.from) === null || _c === void 0 ? void 0 : _c.username)];
            case 4:
                _e.sent();
                return [4 /*yield*/, bot.sendMessage(chatId, "Welcome to your budget tracker ".concat((_d = msg === null || msg === void 0 ? void 0 : msg.from) === null || _d === void 0 ? void 0 : _d.username), opts)];
            case 5:
                _e.sent();
                _e.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, bot.sendMessage(chatId, "It seems you have not set your username in telgram, please set it and try again")];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
bot.onText(/Check My Balance/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, _a, _b, _c, _d, _e;
    var _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                chatId = msg.chat.id;
                _h.label = 1;
            case 1:
                _h.trys.push([1, 7, , 9]);
                if (!((_f = msg === null || msg === void 0 ? void 0 : msg.from) === null || _f === void 0 ? void 0 : _f.username)) return [3 /*break*/, 4];
                _b = (_a = bot).sendMessage;
                _c = [chatId];
                _d = "Your balance is ".concat;
                return [4 /*yield*/, budget.showBalance((_g = msg === null || msg === void 0 ? void 0 : msg.from) === null || _g === void 0 ? void 0 : _g.username)];
            case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.apply("Your balance is ", [_h.sent()])]))];
            case 3:
                _h.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, bot.sendMessage(chatId, "You should start with /start")];
            case 5:
                _h.sent();
                _h.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                _e = _h.sent();
                return [4 /*yield*/, bot.sendMessage(chatId, "You should start with /start")];
            case 8:
                _h.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
bot.onText(/Add Expense/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var listenerReply, username, contentMessage;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.username) {
                    username = (_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.username;
                }
                return [4 /*yield*/, bot.sendMessage(msg.chat.id, "Enter the amount and note ", {
                        "reply_markup": {
                            "force_reply": true
                        }
                    })];
            case 1:
                contentMessage = _c.sent();
                listenerReply = (function (replyHandler) { return __awaiter(void 0, void 0, void 0, function () {
                    var amount, description, descriptionMsg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                bot.removeReplyListener(listenerReply);
                                if (!(replyHandler.text === "/cancel")) return [3 /*break*/, 2];
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, "Canceled", opts)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                            case 2:
                                if (!(replyHandler === null || replyHandler === void 0 ? void 0 : replyHandler.text)) return [3 /*break*/, 7];
                                amount = parseInt(replyHandler.text.split(" ")[0]);
                                if (!isNaN(amount)) return [3 /*break*/, 4];
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, "Please enter a number", opts)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                            case 4:
                                description = replyHandler.text.split(" ").splice(1).join(" ");
                                descriptionMsg = description == "" ? "Expense added with no note" : "Expense has been added with note `".concat(description, "`");
                                return [4 /*yield*/, budget.addExpense(username, amount, description)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, descriptionMsg, opts)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply)];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.onText(/Add Income/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var listenerReply, username, contentMessage;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.username) {
                    username = (_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.username;
                }
                return [4 /*yield*/, bot.sendMessage(msg.chat.id, "Enter the amount and note ", {
                        "reply_markup": {
                            "force_reply": true
                        }
                    })];
            case 1:
                contentMessage = _c.sent();
                listenerReply = (function (replyHandler) { return __awaiter(void 0, void 0, void 0, function () {
                    var amount, description, descriptionMsg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                bot.removeReplyListener(listenerReply);
                                if (!(replyHandler.text === "/cancel")) return [3 /*break*/, 2];
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, "Canceled", opts)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                            case 2:
                                if (!(replyHandler === null || replyHandler === void 0 ? void 0 : replyHandler.text)) return [3 /*break*/, 7];
                                amount = parseInt(replyHandler.text.split(" ")[0]);
                                if (!isNaN(amount)) return [3 /*break*/, 4];
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, "Please enter a number", opts)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                            case 4:
                                description = replyHandler.text.split(" ").splice(1).join(" ");
                                descriptionMsg = description == "" ? "Income added with no note" : "Income has been added with note `".concat(description, "`");
                                return [4 /*yield*/, budget.addIncome(username, amount, description)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, descriptionMsg, opts)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply)];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.onText(/Show Transaction/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var username, transactions, message, _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                username = ((_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.username) ? (_c = msg === null || msg === void 0 ? void 0 : msg.from) === null || _c === void 0 ? void 0 : _c.username : "";
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, , 9]);
                if (!(username === "")) return [3 /*break*/, 3];
                return [4 /*yield*/, bot.sendMessage(msg.chat.id, "You should start with /start")];
            case 2:
                _d.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, budget.showTransaction(username)];
            case 4:
                transactions = _d.sent();
                message = transactions;
                return [4 /*yield*/, bot.sendMessage(msg.chat.id, JSON.stringify(message))];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                _a = _d.sent();
                return [4 /*yield*/, bot.sendMessage(msg.chat.id, "You have not entered any transaction yet")];
            case 8:
                _d.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});
server.listen(8080, '0.0.0.0', bot.startPolling());
