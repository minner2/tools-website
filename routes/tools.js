const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// 直接引入 tools.js 文件
const toolsPath = path.join(__dirname, '../public/js/tools.js');
// 使用 require 动态加载 tools.js
const toolsData = require(toolsPath.replace('.js', ''));

// 读取工具数据的函数
async function readToolsData() {
    const content = await fs.readFile(toolsPath, 'utf8');
    // 从文件内容中提取 JSON 数据
    const match = content.match(/const toolsData = ({[\s\S]*});/);
    if (match) {
        return JSON.parse(match[1]);
    }
    return {};
}

// 获取所有工具
router.get('/', async (req, res) => {
    try {
        const toolsData = await readToolsData();
        res.json(toolsData);
    } catch (error) {
        console.error('读取数据失败:', error);
        res.status(500).json({ error: '读取数据失败: ' + error.message });
    }
});

// 获取所有分类
router.get('/categories', async (req, res) => {
    try {
        const toolsData = await readToolsData();
        const categories = Object.keys(toolsData);
        res.json(categories);
    } catch (error) {
        console.error('获取分类失败:', error);
        res.status(500).json({ error: '获取分类失败: ' + error.message });
    }
});

// 添加新工具
router.post('/', async (req, res) => {
    try {
        console.log('收到新工具请求:', req.body);
        const newTool = req.body;
        
        // 验证必要字段
        if (!newTool.name || !newTool.url || !newTool.description || !newTool.category) {
            throw new Error('缺少必要字段');
        }

        // 读取当前的工具数据
        const toolsData = await readToolsData();

        // 根据分类自动设置图标
        switch(newTool.category) {
            case 'AI网站':
                newTool.icon = 'fas fa-robot';
                break;
            case '编程知识':
                newTool.icon = 'fas fa-code';
                break;
            case '精神粮食':
                newTool.icon = 'fas fa-book';
                break;
            case '资讯':
                newTool.icon = 'fas fa-newspaper';
                break;
            default:
                newTool.icon = 'fas fa-tools';
        }

        // 确保分类存在
        if (!toolsData[newTool.category]) {
            toolsData[newTool.category] = [];
        }
        
        // 添加新工具
        toolsData[newTool.category].push(newTool);
        
        // 将更新后的数据写回文件
        const newContent = `const toolsData = ${JSON.stringify(toolsData, null, 4)};
module.exports = toolsData;`;
        await fs.writeFile(toolsPath, newContent, 'utf8');
        
        res.json({ message: '工具添加成功', tool: newTool });
    } catch (error) {
        console.error('添加工具失败:', error);
        res.status(500).json({ error: '添加工具失败: ' + error.message });
    }
});

module.exports = router; 