const db = require('./db');

async function seed() {
  await db.query(
    'INSERT INTO tasks (name, description, completed) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
    [
      '買い物', 'スーパーで牛乳とパンを買う', false,
      '勉強', '英語の宿題を終わらせる', false,
      '運動', '30分ランニングをする', true
    ]
  );
  console.log('初期データ挿入完了');
  process.exit();
}

seed();