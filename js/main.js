/**
 * LUXY WORK - Main JavaScript
 * インタラクション機能の実装
 */

// ================================
// メニュートグル機能
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // ハンバーガーアイコンのアニメーション
            this.classList.toggle('active');
        });
        
        // メニュー外をクリックしたら閉じる
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-wrapper')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // メニューリンクをクリックしたら閉じる（モバイル）
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
});

// ================================
// スクロール時のヘッダー背景変更
// ================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
});

// ================================
// スムーススクロール
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // "#"だけのリンクは除外
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// スクロールアニメーション(フェードイン)
// ================================
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .category-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ページ読み込み時にアニメーション初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fadeInOnScroll);
} else {
    fadeInOnScroll();
}

// ================================
// 外部リンクに自動でtarget="_blank"を追加
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        // 既にtarget属性が設定されていない場合のみ
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// ================================
// 「準備中」リンクのクリック処理
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('このページは現在準備中です。\n公開まで今しばらくお待ちください。');
        });
    });
});

// ================================
// パフォーマンス最適化：画像の遅延読み込み
// ================================
if ('loading' in HTMLImageElement.prototype) {
    // ネイティブのlazy loadingをサポートしている場合
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Intersection Observerを使った遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ================================
// ユーティリティ関数
// ================================

/**
 * デバウンス関数 - イベントの発火回数を制限
 */
function debounce(func, wait = 200) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * スロットル関数 - 一定時間内に1回だけ実行
 */
function throttle(func, limit = 200) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// スクロールイベントの最適化例
const optimizedScroll = throttle(function() {
    // スクロール時の処理
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ================================
// コンソールウェルカムメッセージ
// ================================
console.log('%c🌟 LUXY WORK 🌟', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%c美しく、賢く、自分らしく働く', 'font-size: 14px; color: #764ba2;');
console.log('%c開発者の方へ：このサイトは静的HTMLで構築されています。', 'font-size: 12px; color: #666;');
