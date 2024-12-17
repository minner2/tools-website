document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.querySelector('.category-container');
    const toolsGrid = document.querySelector('.tools-grid');
    const searchInput = document.getElementById('search');
    const themeToggle = document.querySelector('.theme-toggle');
    const mainContainer = document.querySelector('.main-container');
    const backToTopBtn = document.getElementById('backToTop');
    
    // 添加错误检查
    if (!categoryContainer || !toolsGrid) {
        console.error('Required elements not found!');
        return;
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function generateCategories() {
        if (!toolsData) {
            console.error('toolsData is not defined');
            return;
        }
        
        const categories = Object.keys(toolsData);
        categoryContainer.innerHTML = '';
        
        categories.forEach((category, index) => {
            const btn = document.createElement('button');
            btn.className = `category-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = category;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => 
                    b.classList.remove('active')
                );
                btn.classList.add('active');
                displayTools(category);
            });
            
            categoryContainer.appendChild(btn);
        });
    }

    function displayTools(category) {
        toolsGrid.innerHTML = '';
        
        if (toolsData[category]) {
            toolsData[category].forEach(tool => {
                const card = createToolCard(tool);
                toolsGrid.appendChild(card);
            });
        }
    }

    function createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card';
        
        card.innerHTML = `
            <div class="tool-icon">
                <img src="https://www.google.com/s2/favicons?domain=${tool.url}&sz=32" 
                     alt="${tool.name}" 
                     onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\"fas fa-tools\"></i>
            </div>
            <a href="${tool.url}" target="_blank" class="tool-name">
                <h3>${tool.name}</h3>
                <span class="tool-url">${new URL(tool.url).hostname}</span>
            </a>
            <p class="tool-description">${tool.description}</p>
        `;
        return card;
    }

    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allTools = Object.values(toolsData).flat();
        
        const filteredTools = allTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm)
        );

        toolsGrid.innerHTML = '';
        filteredTools.forEach(tool => {
            toolsGrid.appendChild(createToolCard(tool));
        });
    });

    // 主题切换
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // 初始化
    generateCategories();
    if (Object.keys(toolsData).length > 0) {
        displayTools(Object.keys(toolsData)[0]);
    }

    // 移动端适配
    if (mainContainer) {
        const handleResize = () => mainContainer.classList.toggle('mobile-view', isMobile());
        handleResize();
        window.addEventListener('resize', handleResize);
    }

    // 回到顶部功能
    if (backToTopBtn) {
        
        // 在移动端才显示/隐藏，PC端一直显示
        if (isMobile()) {
            backToTopBtn.style.opacity = '0';
            window.addEventListener('scroll', () => {
                if (window.scrollY > 200) {
                    backToTopBtn.style.opacity = '1';
                } else {
                    backToTopBtn.style.opacity = '0';
                }
            }, { passive: true });
        }else{
            backToTopBtn.style.opacity = '0';
        }

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 