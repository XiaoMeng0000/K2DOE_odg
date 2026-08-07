'use strict';

// ==========================================================================
// 内容渲染模块（数据驱动）
// 按当前语言从文案配置渲染各板块文本内容，语言切换时整体重渲染
// 特色板块的左右交替布局由配置中的 imageSide 字段驱动
// ==========================================================================

import { I18n } from '../core/i18n.js';
import { EventBus } from '../core/event-bus.js';

/**
 * 创建元素的小工具
 * @param {string} tag 标签名
 * @param {string} [cls] 类名
 * @param {string} [text] 文本内容
 * @returns {HTMLElement}
 */
function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) {
        node.className = cls;
    }
    if (text !== undefined) {
        node.textContent = text;
    }
    return node;
}

// —— 渲染各板块 ——

function renderAbout(c) {
    document.querySelector('#about-head .t').textContent = c.about.title;
    document.querySelector('#about-head .section-tag').textContent = c.about.tag;
    document.getElementById('about-body').textContent = c.about.body;
}

// 渲染特色板块（左右交替）
function renderFeatures(c) {
    document.querySelector('#features-head .t').textContent = c.features.title;
    document.querySelector('#features-head .section-tag').textContent = c.features.tag;
    document.getElementById('features-intro').textContent = c.features.intro;

    const list = document.getElementById('features-list');
    list.textContent = '';

    c.features.items.forEach((feature) => {
        // 整行：方向由 imageSide 决定（left = 左图右文，right = 右图左文）
        const row = el('article', 'feature-row reveal');
        row.classList.add(
            feature.imageSide === 'right' ? 'row-media-right' : 'row-media-left'
        );

        // 实机画面区
        const media = el('div', 'feature-media');
        const img = el('img', 'feature-img');
        img.src = feature.image;
        img.alt = feature.title;
        img.loading = 'lazy';
        // 图片加载失败时隐藏，避免显示破图
        img.onerror = () => img.classList.add('img-missing');
        media.appendChild(img);

        // 文字区
        const copy = el('div', 'feature-copy');
        copy.appendChild(el('span', 'feature-index', feature.index));
        copy.appendChild(el('h3', 'feature-title', feature.title));
        copy.appendChild(el('span', 'feature-sub', feature.subtitle));
        copy.appendChild(el('p', 'feature-desc', feature.description));

        row.appendChild(media);
        row.appendChild(copy);
        list.appendChild(row);
    });
}

// 渲染公测需知（列表项由配置 items 驱动，空时仅显示 note）
function renderNotices(c) {
    document.querySelector('#notices-head .t').textContent = c.notices.title;
    document.querySelector('#notices-head .section-tag').textContent = c.notices.tag;
    document.getElementById('notices-intro').textContent = c.notices.note;

    const list = document.getElementById('notices-list');
    list.textContent = '';

    c.notices.items.forEach((item, i) => {
        const li = el('li');
        const num = el('span', 'notice-index', '[' + String(i + 1).padStart(2, '0') + ']');
        const text = el('span', 'notice-text', item);
        li.appendChild(num);
        li.appendChild(text);
        list.appendChild(li);
    });
}

// 渲染版权声明（每个 block：一个 // 注释标签 + 若干正文行）
function renderLegal(c) {
    document.querySelector('#legal-head .t').textContent = c.legal.title;
    document.querySelector('#legal-head .section-tag').textContent = c.legal.tag;

    const blocks = document.getElementById('legal-blocks');
    blocks.textContent = '';

    c.legal.blocks.forEach((block) => {
        const blockEl = el('article', 'legal-block reveal');
        blockEl.appendChild(el('span', 'legal-label', block.label));

        const lines = el('div', 'legal-lines');
        block.lines.forEach((line) => {
            lines.appendChild(el('p', 'legal-line', line));
        });
        blockEl.appendChild(lines);
        blocks.appendChild(blockEl);
    });
}

// 渲染联系渠道
function renderContact(c) {
    document.querySelector('#contact-head .t').textContent = c.contact.title;
    document.querySelector('#contact-head .section-tag').textContent = c.contact.tag;
    document.getElementById('contact-note').textContent = c.contact.note;

    const grid = document.getElementById('contact-grid');
    grid.textContent = '';

    c.contact.channels.forEach((channel) => {
        const card = el('a', 'contact-card');
        card.href = channel.url;
        card.rel = 'noopener';
        // 邮箱保持本页打开，其余频道新开页
        if (channel.id !== 'email') {
            card.target = '_blank';
        }
        card.appendChild(el('span', 'contact-badge', channel.badge));
        card.appendChild(el('span', 'contact-label', channel.label));
        card.appendChild(el('span', 'contact-value', channel.value));
        card.appendChild(el('span', 'contact-hint', channel.hint));
        grid.appendChild(card);
    });
}

function renderFooter(c) {
    document.getElementById('footer-brand').textContent = c.footer.brand;
    document.getElementById('footer-copy').textContent = c.footer.copyright;
    document.getElementById('footer-note').textContent = c.footer.note;
}

/**
 * 渲染页面全部内容（按当前语言）
 */
export function renderAll() {
    const c = I18n.getContent();
    renderAbout(c);
    renderFeatures(c);
    renderNotices(c);
    renderLegal(c);
    renderContact(c);
    renderFooter(c);
}

/**
 * 初始化内容渲染：首次渲染并监听语言切换
 */
export function initSections() {
    renderAll();
    EventBus.on('language-changed', renderAll);
}
