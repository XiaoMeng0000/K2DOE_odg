'use strict';

// ==========================================================================
// 官网入口（三页共用：index / news / guide）
// 页面由 <body data-page="home|news|guide"> 标识；倒计时只在首页初始化
// 初始化顺序：内容渲染 → 导航 → 倒计时 → 星空背景 → 滚动动效
// 各模块通过 State / EventBus 通信，互不直接耦合
// ==========================================================================

import { initSections } from './modules/sections.js';
import { initNavigation } from './modules/navigation.js';
import { initStarfield } from './modules/starfield.js';
import { initCountdown } from './modules/countdown.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

// 当前页面标识（home / news / guide）
const PAGE = document.body.dataset.page || 'home';

// 处理导航栏 Logo：图片未就绪时隐藏，仅保留文字品牌
function initBrandLogo() {
    const logo = document.getElementById('brand-logo');
    if (logo) {
        logo.onerror = () => logo.classList.add('img-missing');
    }
}

function boot() {
    initBrandLogo();
    initSections();
    initNavigation();
    if (PAGE === 'home') {
        // 倒计时结构仅在首页存在
        initCountdown();
    }
    initStarfield(document.getElementById('starfield'));
    initScrollReveal();

    // 控制台输出页面信息，方便调试
    // TEMP: 上线前可移除
    console.info('[KSP2D:OE] page ready:', PAGE);
}

// 等待 DOM 就绪后启动（脚本带 defer 特性，DOMContentLoaded 时结构已完整）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
