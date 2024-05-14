const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: '请填写完整注册信息' });
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ error: '用户名已存在' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: '密码和确认密码不匹配' });
  }

  users.push({ username, email, password });

  res.status(200).json({ message: '注册成功' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 在这里处理登录逻辑，比如检查用户名密码是否匹配等
  // 这里只是一个示例，实际逻辑需要根据您的需求来实现

  // 检查用户是否存在
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ error: '用户不存在' });
  }

  // 检查密码是否正确
  if (user.password !== password) {
    return res.status(400).json({ error: '密码错误' });
  }

  // 登录成功
  res.status(200).json({ message: '登录成功' });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
