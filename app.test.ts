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
  it('文章内に新規が含まれている', async () => {
    const res = await request(app).get('/todo/new');
    expect(res.text).toContain('新規');
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