'use strict';

// ==========================================================================
// 导航模块
// 负责：渲染导航链接、语言切换按钮、滚动时高亮当前板块、更新 <html lang> 与页面标题
// ==========================================================================

import { State } from '../core/state.js';
import { EventBus } from '../core/event-bus.js';
import { I18n } from '../core/i18n.js';
import { SITE_CONFIG } from '../config/site-config.js';

// 滚动时判断当前板块的阈值（顶部偏移，扣除导航栏高度）
const SCROLL_OFFSET = 100;

/**
 * 初始化导航模块
 */
export function initNavigation() {
    const navList = document.getElementById('nav-links');
    const langSwitch = document.getElementById('lang-switch');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links = [];

    // —— 渲染导航链接 ——
    function renderLinks() {
        const content = I18n.getContent();
        navList.textContent = '';
        links.length = 0;

        content.nav.links.forEach((item) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + item.id;
            a.textContent = item.label;
            a.dataset.nav = item.id;
            li.appendChild(a);
            navList.appendChild(li);
            links.push(a);
        });

        // 同步语言按钮显示目标语言
        langSwitch.textContent = content.nav.langSwitchTo;
    }

    // —— 滚动高亮当前板块 ——
    function onScroll() {
        // 滚动接近页面底部时，强制高亮最后一个板块（最后一节的 top 永远达不到阈值）
        const nearBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;

        let current = sections[0] ? sections[0].id : 'hero';
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= SCROLL_OFFSET) {
                current = section.id;
            }
        });
        if (nearBottom && sections.length) {
            current = sections[sections.length - 1].id;
        }
        links.forEach((a) => {
            a.classList.toggle('active', a.dataset.nav === current);
        });
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
        // 同步页面标题（站点配置中的中/英文全称）
        const name = SITE_CONFIG.name[lang] || SITE_CONFIG.name.zh;
        document.title = 'KSP2D:OE | ' + name;
    }

    EventBus.on('language-changed', onLanguageChanged);

    window.addEventListener('scroll', onScroll, { passive: true });

    renderLinks();
    onScroll();
}
