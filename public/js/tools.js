const toolsData = {
    "实用工具": [
        {
            "name": "公众号markdown编辑器",
            "url": "https://doocs-md.pages.dev/",
            "description": "公众号markdown编辑器",
            "category": "实用工具"
        }
    ],
    "IT工具": [
        {
            "name": "公众号",
            "url": "https://doocs-md.pages.dev/",
            "description": "公众号markdown编辑器",
            "category": "IT工具"
        }
    ]
};

// 如果是在浏览器环境
if (typeof window !== 'undefined') {
    window.toolsData = toolsData;
} else {
    module.exports = toolsData;
}

