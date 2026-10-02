'use strict';

// ==========================================================================
// 导航模块（多页 + 首页滚动高亮）
// 负责：渲染站点导航链接、高亮当前所在位置、语言切换按钮、更新 <html lang> 与页面标题
// 高亮规则：
//   - 二级页（news / guide）：高亮当前页对应的导航项
//   - 首页：随滚动高亮当前板块（板块 → 导航项映射见 SECTION_TO_NAV）
// ==========================================================================

import { State } from '../core/state.js';
import { EventBus } from '../core/event-bus.js';
import { I18n } from '../core/i18n.js';
import { SITE_CONFIG } from '../config/site-config.js';

// 页面标识 → 默认高亮导航项
const PAGE_TO_NAV = {
    home: 'home',
    news: 'news',
    guide: 'guide',
};

// 首页板块 id → 导航项 id（滚动高亮）
// 更新记录与版权归入各自最相关的导航项，避免滚动时高亮来回跳动
const SECTION_TO_NAV = {
    hero: 'home',
    about: 'home',
    features: 'features',
    updates: 'news',
    guide: 'guide',
    contact: 'contact',
    legal: 'contact',
};

// 判定"当前板块"的顶部偏移（扣除固定导航栏高度）
const SCROLL_OFFSET = 120;

/**
 * 初始化导航模块
 */
export function initNavigation() {
    const navList = document.getElementById('nav-links');
    const langSwitch = document.getElementById('lang-switch');
    const page = document.body.dataset.page || 'home';
    const sections = page === 'home'
        ? Array.from(document.querySelectorAll('section[id]'))
        : [];

    let links = [];
    let currentNav = PAGE_TO_NAV[page] || 'home';

    // —— 高亮同步 ——
    function applyActive() {
        links.forEach((a) => {
            a.classList.toggle('active', a.dataset.nav === currentNav);
        });
    }

    // —— 渲染导航链接 ——
    function renderLinks() {
        const content = I18n.getContent();
        navList.textContent = '';
        links = [];

        content.nav.links.forEach((item) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            a.dataset.nav = item.id;
            li.appendChild(a);
            navList.appendChild(li);
            links.push(a);
        });

        // 同步语言按钮显示目标语言
        langSwitch.textContent = content.nav.langSwitchTo;
        applyActive();
    }

    // —— 首页滚动高亮 ——
    function onScroll() {
        if (!sections.length) {
            return;
        }

        // 滚动接近页面底部时，强制取最后一个板块（最后一节到不了阈值）
        const nearBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;

        let current = sections[0].id;
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= SCROLL_OFFSET) {
                current = section.id;
            }
        });
        if (nearBottom) {
            current = sections[sections.length - 1].id;
        }

        const navId = SECTION_TO_NAV[current] || currentNav;
        if (navId !== currentNav) {
            currentNav = navId;
            applyActive();
        }
    }

    // —— 页面标题（站点名 / 板块名 · 跟随语言） ——
    function updateTitle(lang) {
        const content = I18n.getContent();
        const siteShort = SITE_CONFIG.shortName;
        let pageName = null;
        if (page === 'news') {
            pageName = content.updates.title;
        } else if (page === 'guide') {
            pageName = content.guide.title;
        }
        document.title = pageName
            ? pageName + ' | ' + siteShort
            : siteShort + ' | ' + (SITE_CONFIG.name[lang] || SITE_CONFIG.name.zh);
    }

    // —— 语言切换 ——
    langSwitch.addEventListener('click', () => {
        const next = State.data.language === 'zh' ? 'en' : 'zh';
        I18n.setLanguage(next);
    });

    // —— 语言变更后的收尾处理 ——
    function onLanguageChanged(lang) {
        renderLinks();
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        updateTitle(lang);
    }

    EventBus.on('language-changed', onLanguageChanged);

    if (sections.length) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
    }

    onLanguageChanged(State.data.language);
    onScroll();
}
