const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const toolsRouter = require('./routes/tools');

const app = express();
const PORT = 9500;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 登录验证
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
});

// 路由
app.use('/api/tools', toolsRouter);

// 提供前端页面
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// 重定向根路径到index.html
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 