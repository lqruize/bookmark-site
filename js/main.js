// 获取DOM元素
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const toolsContainer = document.querySelector('.tools-container');
const toolCards = document.querySelectorAll('.tool-card');
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const loadingOverlay = document.querySelector('.loading-overlay');

// 收藏功能
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// 初始化收藏状态
function initializeFavorites() {
    favoriteButtons.forEach(btn => {
        const toolId = btn.getAttribute('data-id');
        if (favorites.includes(toolId)) {
            btn.classList.add('active');
            btn.querySelector('i').classList.remove('far');
            btn.querySelector('i').classList.add('fas');
        }
    });
}

// 收藏按钮点击事件
favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const toolId = btn.getAttribute('data-id');
        const icon = btn.querySelector('i');
        
        if (favorites.includes(toolId)) {
            // 取消收藏
            favorites = favorites.filter(id => id !== toolId);
            btn.classList.remove('active');
            icon.classList.remove('fas');
            icon.classList.add('far');
        } else {
            // 添加收藏
            favorites.push(toolId);
            btn.classList.add('active');
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
        
        // 保存到localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});

// 显示加载动画
function showLoading() {
    loadingOverlay.classList.add('active');
}

// 隐藏加载动画
function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// 分类按钮点击事件
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        showLoading();
        // 移除所有按钮的active类
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // 添加当前按钮的active类
        button.classList.add('active');
        
        const selectedCategory = button.getAttribute('data-category');
        filterTools(selectedCategory);
        
        // 模拟加载延迟
        setTimeout(hideLoading, 500);
    });
});

// 搜索功能
searchButton.addEventListener('click', () => {
    showLoading();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        filterToolsBySearch(searchTerm);
    } else {
        // 如果搜索框为空，显示所有卡片
        toolCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    // 模拟加载延迟
    setTimeout(hideLoading, 500);
});

// 回车搜索
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// 根据分类筛选工具
function filterTools(category) {
    toolCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            // 添加淡入动画
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            // 添加淡出动画
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 根据搜索词筛选工具
function filterToolsBySearch(searchTerm) {
    toolCards.forEach(card => {
        const title = card.querySelector('.tool-title').textContent.toLowerCase();
        const description = card.querySelector('.tool-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            // 添加淡入动画
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            // 添加淡出动画
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 页面加载时初始化收藏状态
document.addEventListener('DOMContentLoaded', () => {
    initializeFavorites();
    // 模拟初始加载
    showLoading();
    setTimeout(hideLoading, 1000);
}); 