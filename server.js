const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

// Отдаём фронтенд из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Для SPA: возвращаем index.html на любые другие запросы
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
