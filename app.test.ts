import request from 'supertest';
import app from './app'; // app.tsで `export default app;` が必要
// @ts-nocheck
// @ts-ignore
import db from './db/db'; // DB接続モジュールをインポート

describe('GET /todo', () => {
  it('should return 200 and render the todo list', async () => {
    const res = await request(app).get('/todo');
    expect(res.status).toBe(200);
    // 例: HTML内に「タスク一覧」が含まれているか
    expect(res.text).toContain('タスク一覧');
  });
});

describe('GET /todo/new', () => {
  it('新規作成画面に移動できている', async () => {
    const res = await request(app).get('/todo/new');
    expect(res.text).toContain('新規');
  });
});

describe('GET /todo/3', () => {
  it('詳細画面の勉強に移動できている', async () => {
    const res = await request(app).get('/todo/3');
    expect(res.text).toContain('運動');
  });
});

describe('delete /todo/:id', () => {
  let insertedId: number;

  beforeAll(async () => {
    // テスト用タスクを追加
    const [result]: any = await db.query(
      'INSERT INTO tasks (name, description) VALUES (?, ?)',
      ['削除テスト用', 'テスト用の説明']
    );
    insertedId = result.insertId;
  });

  it('タスクを削除できている', async () => {
    const res = await request(app).delete(`/todo/${insertedId}`);
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/todo');
    // 削除されたことを確認
    const [[task]] = await db.query('SELECT * FROM tasks WHERE id = ?', [insertedId]);
    expect(task).toBeUndefined();
  });
});

describe('DB接続テスト', () => {
  it('tasksテーブルに接続できること', async () => {
    const [rows] = await db.query('SELECT 1');
    expect(rows).toBeDefined();
  });

  it('tasksテーブルが存在し、カラムが取得できること', async () => {
    const [rows] = await db.query('SHOW COLUMNS FROM tasks');
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.some((col: any) => col.Field === 'name')).toBe(true);
  });
});

afterAll(async () => {
  await db.end(); // DB接続を閉じる
});