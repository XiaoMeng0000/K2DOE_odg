'use strict';

// ==========================================================================
// 官网入口（对应游戏 main.js 的角色）
// 初始化顺序：内容渲染 → 导航 → 星空背景 → 倒计时 → 滚动动效
// 各模块通过 State / EventBus 通信，互不直接耦合
// ==========================================================================

import { SITE_CONFIG } from './config/site-config.js';
import { initSections } from './modules/sections.js';
import { initNavigation } from './modules/navigation.js';
import { initStarfield } from './modules/starfield.js';
import { initCountdown } from './modules/countdown.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

// 处理导航栏 Logo：图片未就绪时隐藏，仅保留文字品牌
function initBrandLogo() {
    const logo = document.getElementById('brand-logo');
    logo.onerror = () => logo.classList.add('img-missing');
}

function boot() {
    initBrandLogo();
    initSections();
    initNavigation();
    initCountdown();
    initStarfield(document.getElementById('starfield'));
    initScrollReveal();

    // 控制台输出站点信息，方便调试
    // TEMP: 上线前可移除
    console.info('[KSP2D:OE] site ready · launch target:', SITE_CONFIG.launchDate.toLocaleString());
}

// 等待 DOM 就绪后启动（脚本带 defer 特性，DOMContentLoaded 时结构已完整）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
