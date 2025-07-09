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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql2'); // MySQLのドライバ
var ejsMate = require('ejs-mate');
var db = require('./db/db'); // MySQLの接続設定を含むモジュール
var methodOverride = require('method-override'); // HTTPメソッドのオーバーライドを可能にするミドルウェア
// ejsのテンプレートエンジンを設定
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method')); // _methodクエリパラメータを使用
app.use(express.urlencoded({ extended: true })); //expressのミドルウェアを設定
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルの提供
// 例：タスク一覧取得
app.get('/todo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.query('SELECT * FROM tasks')];
            case 1:
                tasks = (_a.sent())[0];
                res.render('index', { tasks: tasks });
                return [2 /*return*/];
        }
    });
}); });
// 新規タスク登録画面のルーティングここで削除やタスクの完了ができると良い
app.get('/todo/new', function (req, res) {
    res.render('todos/new');
});
app.post('/todo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, db.query('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description])];
            case 1:
                _b.sent(); // データベースにタスクを保存
                res.redirect('/todo');
                return [2 /*return*/];
        }
    });
}); });
app.get('/todo/:id/edit', function (req, res) {
    var taskId = req.params.id; // URLパラメータからタスクIDを取得
    // ここでタスクIDに基づいてデータを取得し、編集画面に渡す
    res.render('todos/edit', { taskId: taskId }); // 編集画面にタスクIDを渡す、ここで削除も行える
});
app.post('/todo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, db.query('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description])];
            case 1:
                _b.sent(); // データベースにタスクを保存
                res.redirect('/todo');
                return [2 /*return*/];
        }
    });
}); });
app.put('/todo/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, _a, name, description, completed;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                taskId = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, completed = _a.completed;
                return [4 /*yield*/, db.query('UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?', [name, description, completed === 'on', taskId])];
            case 1:
                _b.sent();
                res.redirect('/todo');
                return [2 /*return*/];
        }
    });
}); });
// タスク削除
app.delete('/todo/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.id;
                return [4 /*yield*/, db.query('DELETE FROM tasks WHERE id = ?', [taskId])];
            case 1:
                _a.sent();
                res.redirect('/todo');
                return [2 /*return*/];
        }
    });
}); });
exports.default = app; // appをエクスポートして、他のモジュールで使用できるようにする
