import request from 'supertest';
import app from './app'; // app.tsで `export default app;` が必要

describe('GET /todo', () => {
  it('should return 200 and render the todo list', async () => {
    const res = await request(app).get('/todo');
    expect(res.status).toBe(200);
    // 例: HTML内に「タスク一覧」が含まれているか
    expect(res.text).toContain('タスク一覧');
  });
});
