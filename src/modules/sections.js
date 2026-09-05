'use strict';

// ==========================================================================
// 内容渲染模块（数据驱动）
// 按当前语言从文案配置渲染各板块文本内容，语言切换时整体重渲染
// 特色板块布局由配置驱动：带 image 的条目左右交替（imageSide），不带 image 的条目渲染为文字卡
// ==========================================================================

import { I18n } from '../core/i18n.js';
import { EventBus } from '../core/event-bus.js';
import { SITE_CONFIG } from '../config/site-config.js';

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

// 渲染 Hero 的正式运营状态卡（倒计时冻结后可见）
// 标题/副文由倒计时模块维护，这里只负责版本行与 CTA 按钮（随语言切换重渲染）
function renderHero(c) {
    const versionLine = document.getElementById('launched-version');
    if (versionLine) {
        versionLine.textContent = SITE_CONFIG.version
            + (SITE_CONFIG.devVersion ? ' · dev ' + SITE_CONFIG.devVersion : '');
    }

    const ctaBox = document.getElementById('launched-cta');
    if (!ctaBox || !c.hero || !c.hero.cta) {
        return;
    }
    ctaBox.textContent = '';

    // 主按钮：立即试玩（站点配置中的本体链接）
    const play = el('a', 'cta-btn cta-primary', c.hero.cta.playLabel);
    play.href = SITE_CONFIG.links.play;
    play.target = '_blank';
    play.rel = 'noopener';

    ctaBox.appendChild(play);
}

function renderAbout(c) {
    document.querySelector('#about-head .t').textContent = c.about.title;
    document.querySelector('#about-head .section-tag').textContent = c.about.tag;
    document.getElementById('about-body').textContent = c.about.body;
}

// 渲染特色板块：有图条目左右交替整行，无图条目收进文字卡矩阵
function renderFeatures(c) {
    document.querySelector('#features-head .t').textContent = c.features.title;
    document.querySelector('#features-head .section-tag').textContent = c.features.tag;
    document.getElementById('features-intro').textContent = c.features.intro;

    const list = document.getElementById('features-list');
    list.textContent = '';

    // 连续出现的无图条目共用同一文字卡容器
    let matrix = null;

    c.features.items.forEach((feature) => {
        if (!feature.image) {
            // 无图文字卡
            if (!matrix) {
                matrix = el('div', 'feature-matrix');
                list.appendChild(matrix);
            }
            const card = el('article', 'feature-card reveal');
            card.appendChild(el('span', 'feature-index', feature.index));
            card.appendChild(el('h3', 'feature-title', feature.title));
            card.appendChild(el('span', 'feature-sub', feature.subtitle));
            card.appendChild(el('p', 'feature-desc', feature.description));
            matrix.appendChild(card);
            return;
        }

        // 有图条目：整行左右交替（后续无图条目需要新的矩阵容器）
        matrix = null;

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

// 渲染版本动态（时间线条目由配置 entries 驱动）
function renderUpdates(c) {
    document.querySelector('#updates-head .t').textContent = c.updates.title;
    document.querySelector('#updates-head .section-tag').textContent = c.updates.tag;
    document.getElementById('updates-intro').textContent = c.updates.note || '';

    const list = document.getElementById('updates-list');
    list.textContent = '';

    c.updates.entries.forEach((entry) => {
        const card = el('article', 'update-card reveal');

        const head = el('div', 'update-head');
        head.appendChild(el('span', 'update-version', entry.version));
        if (entry.date) {
            head.appendChild(el('span', 'update-date', entry.date));
        }
        card.appendChild(head);

        card.appendChild(el('h3', 'update-title', entry.title));

        const ul = el('ul', 'update-items');
        (entry.items || []).forEach((item) => {
            ul.appendChild(el('li', null, item));
        });
        card.appendChild(ul);

        list.appendChild(card);
    });
}

// 渲染版本状态（列表项由配置 items 驱动，空时仅显示 note）
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

// 复制兜底：Clipboard API 不可用时，降级为临时输入框 + execCommand
function copyLegacy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        // 静默失败：至少让用户能手动选中
    }
    document.body.removeChild(ta);
}

// 绑定复制按钮：复制联系方式，短暂显示"已复制"反馈
function setupCopyButton(btn, text, label, copiedLabel) {
    btn.addEventListener('click', async (e) => {
        // 阻止触发外层卡片的跳转
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            copyLegacy(text);
        }
        btn.textContent = copiedLabel;
        btn.classList.add('is-copied');
        setTimeout(() => {
            btn.textContent = label;
            btn.classList.remove('is-copied');
        }, 1600);
    });
}

// 渲染联系渠道
function renderContact(c) {
    document.querySelector('#contact-head .t').textContent = c.contact.title;
    document.querySelector('#contact-head .section-tag').textContent = c.contact.tag;
    document.getElementById('contact-note').textContent = c.contact.note;

    const grid = document.getElementById('contact-grid');
    grid.textContent = '';

    const copyLabel = c.contact.copyLabel || '复制';
    const copiedLabel = c.contact.copiedLabel || '已复制';

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

        // 一键复制兜底：即使协议链接失效，也能直接拿到联系方式
        const copyBtn = el('button', 'contact-copy', copyLabel);
        copyBtn.type = 'button';
        copyBtn.setAttribute('aria-label', channel.value);
        setupCopyButton(copyBtn, channel.value, copyLabel, copiedLabel);
        card.appendChild(copyBtn);

        grid.appendChild(card);
    });
}

function renderFooter(c) {
    document.getElementById('footer-brand').textContent = c.footer.brand;
    document.getElementById('footer-copy').textContent = c.footer.copyright;
    document.getElementById('footer-note').textContent = c.footer.note;

    // 版本信息来自站点配置（单一事实源），dev 小标仅在配置存在时显示
    const ver = document.getElementById('footer-version');
    if (ver) {
        ver.textContent = SITE_CONFIG.version;
    }
    const dev = document.getElementById('footer-dev');
    if (dev) {
        dev.textContent = SITE_CONFIG.devVersion ? 'dev ' + SITE_CONFIG.devVersion : '';
    }
}

/**
 * 渲染页面全部内容（按当前语言）
 */
export function renderAll() {
    const c = I18n.getContent();
    renderHero(c);
    renderAbout(c);
    renderFeatures(c);
    renderUpdates(c);
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
