const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2'); // MySQLのドライバ
const ejsMate = require('ejs-mate');
const db = require('./db/db'); // MySQLの接続設定を含むモジュール
const methodOverride = require('method-override'); // HTTPメソッドのオーバーライドを可能にするミドルウェア

import { Request, Response } from 'express';// Expressの型定義をインポート

// ejsのテンプレートエンジンを設定
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method')); // _methodクエリパラメータを使用
app.use(express.urlencoded({extended: true}));//expressのミドルウェアを設定
app.use(express.static(path.join(__dirname, 'public')));// 静的ファイルの提供

// 例：タスク一覧取得
app.get('/todo', async (req: Request, res: Response) => {
  const [tasks] = await db.query('SELECT * FROM tasks');
  res.render('index', { tasks });
});

// 新規タスク登録画面のルーティングここで削除やタスクの完了ができると良い
app.get('/todo/new', (req: Request, res: Response) => { 
    res.render('todos/new');
});

app.post('/todo', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  await db.query('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description]);// データベースにタスクを保存
  res.redirect('/todo');
});

app.get('/todo/:id/edit', (req: Request, res: Response) => { // タスク編集画面のルーティング
    const taskId = req.params.id; // URLパラメータからタスクIDを取得
    // ここでタスクIDに基づいてデータを取得し、編集画面に渡す
    res.render('todos/edit', { taskId }); // 編集画面にタスクIDを渡す、ここで削除も行える
});

app.post('/todo', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  await db.query('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description]);// データベースにタスクを保存
  res.redirect('/todo');
});


app.put('/todo/:id', async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { name, description, completed } = req.body;
  await db.query(
    'UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?',
    [name, description, completed === 'on', taskId]
  );
  res.redirect('/todo');
});

// タスク削除
app.delete('/todo/:id', async (req: Request, res: Response) => {
  const taskId = req.params.id;
  await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
  res.redirect('/todo');
});

app.listen(3000, () => { // ポート3000でサーバーを起動
    console.log('今やってる!!');
});



