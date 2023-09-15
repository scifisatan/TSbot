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
var token = '6627948400:AAHHQXGJFPmrIYE5_qyrpmRc3xl3XMmo4X8';
var bot = new TelegramBot(token, { polling: true });
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
                if (!((_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.username)) return [3 /*break*/, 6];
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
            case 6: return [2 /*return*/];
        }
    });
}); });
bot.onText(/Check My Balance/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, _a, _b, _c, _d;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                chatId = msg.chat.id;
                if (!((_e = msg === null || msg === void 0 ? void 0 : msg.from) === null || _e === void 0 ? void 0 : _e.username)) return [3 /*break*/, 3];
                _b = (_a = bot).sendMessage;
                _c = [chatId];
                _d = "Your balance is ".concat;
                return [4 /*yield*/, budget.showBalance((_f = msg === null || msg === void 0 ? void 0 : msg.from) === null || _f === void 0 ? void 0 : _f.username)];
            case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.apply("Your balance is ", [_g.sent()])]))];
            case 2:
                _g.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, bot.sendMessage(chatId, "IDK mannnn")];
            case 4:
                _g.sent();
                _g.label = 5;
            case 5: return [2 /*return*/];
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
                    var amount, description, _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                bot.removeReplyListener(listenerReply);
                                if (!(replyHandler.text === "/cancel")) return [3 /*break*/, 2];
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, "Canceled", opts)];
                            case 1:
                                _e.sent();
                                return [2 /*return*/];
                            case 2:
                                if (!(replyHandler === null || replyHandler === void 0 ? void 0 : replyHandler.text)) return [3 /*break*/, 4];
                                amount = parseInt(replyHandler.text.split(" ")[0]);
                                description = replyHandler.text.split(" ").splice(1).join(" ");
                                return [4 /*yield*/, budget.addExpense(username, amount, description)];
                            case 3:
                                _e.sent();
                                _e.label = 4;
                            case 4:
                                _b = (_a = bot).sendMessage;
                                _c = [replyHandler.chat.id];
                                _d = "Your balance is ".concat;
                                return [4 /*yield*/, budget.showBalance(username)];
                            case 5: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.apply("Your balance is ", [_e.sent()]), opts]))];
                            case 6:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);
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
                    var amount, description, _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                bot.removeReplyListener(listenerReply);
                                if (!(replyHandler.text === "/cancel")) return [3 /*break*/, 2];
                                return [4 /*yield*/, bot.sendMessage(replyHandler.chat.id, "Canceled", opts)];
                            case 1:
                                _e.sent();
                                return [2 /*return*/];
                            case 2:
                                if (!(replyHandler === null || replyHandler === void 0 ? void 0 : replyHandler.text)) return [3 /*break*/, 4];
                                amount = parseInt(replyHandler.text.split(" ")[0]);
                                description = replyHandler.text.split(" ").splice(1).join(" ");
                                return [4 /*yield*/, budget.addIncome(username, amount, description)];
                            case 3:
                                _e.sent();
                                _e.label = 4;
                            case 4:
                                _b = (_a = bot).sendMessage;
                                _c = [replyHandler.chat.id];
                                _d = "Your balance is ".concat;
                                return [4 /*yield*/, budget.showBalance(username)];
                            case 5: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.apply("Your balance is ", [_e.sent()]), opts]))];
                            case 6:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);
                return [2 /*return*/];
        }
    });
}); });
bot.onText(/Show Transaction/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var username, transactions, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                username = ((_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.username) || "";
                return [4 /*yield*/, budget.showTransaction(username)];
            case 1:
                transactions = _b.sent();
                message = transactions;
                return [4 /*yield*/, bot.sendMessage(msg.chat.id, JSON.stringify(message))];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
