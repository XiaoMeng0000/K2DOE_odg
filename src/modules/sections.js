'use strict';

// ==========================================================================
// 内容渲染模块（数据驱动 · 多页）
// 页面由 <body data-page="home|news|guide"> 标识，本模块按页渲染对应板块
// 语言切换时整体重渲染
// 特色板块布局由配置驱动：带 image 的条目左右交替（imageSide），不带 image 的条目渲染为文字卡
// ==========================================================================

import { I18n } from '../core/i18n.js';
import { EventBus } from '../core/event-bus.js';
import { SITE_CONFIG } from '../config/site-config.js';

// 当前页面标识（home / news / guide）
const PAGE = document.body.dataset.page || 'home';

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

/**
 * 填充板块标题与角标（元素缺失时静默跳过，便于三页共用同一套渲染逻辑）
 * @param {string} id 板块头元素 id
 * @param {string} [title] 标题文本
 * @param {string} [tag] 角标文本
 */
function setSectionHead(id, title, tag) {
    const head = document.getElementById(id);
    if (!head) {
        return;
    }
    const t = head.querySelector('.t');
    const g = head.querySelector('.section-tag');
    if (t && title) {
        t.textContent = title;
    }
    if (g && tag) {
        g.textContent = tag;
    }
}

// ============================ 首页 ============================

// Hero：版本行 + 主 CTA（标题与副文由 countdown.js 维护）
function renderHero(c) {
    const versionLine = document.getElementById('launched-version');
    if (versionLine) {
        versionLine.textContent = SITE_CONFIG.version
            + (SITE_CONFIG.devVersion ? ' · dev ' + SITE_CONFIG.devVersion : '');
    }

    const ctaBox = document.getElementById('launched-cta');
    if (ctaBox && c.hero && c.hero.cta) {
        ctaBox.textContent = '';

        const play = el('a', 'cta-btn cta-primary', c.hero.cta.playLabel);
        play.href = SITE_CONFIG.links.play;
        play.target = '_blank';
        play.rel = 'noopener';
        ctaBox.appendChild(play);
    }

    // 技术规格行（等宽数据条）
    const specsBox = document.getElementById('launched-specs');
    if (specsBox && c.hero && c.hero.specs) {
        specsBox.textContent = c.hero.specs.join(' · ');
    }
}

function renderAbout(c) {
    setSectionHead('about-head', c.about.title, c.about.tag);
    const body = document.getElementById('about-body');
    if (body) {
        body.textContent = c.about.body;
    }
}

// 玩法特色：有图条目左右交替整行，无图条目收进文字卡矩阵
function renderFeatures(c) {
    setSectionHead('features-head', c.features.title, c.features.tag);
    const intro = document.getElementById('features-intro');
    if (intro) {
        intro.textContent = c.features.intro;
    }

    const list = document.getElementById('features-list');
    if (!list) {
        return;
    }
    list.textContent = '';

    // 连续出现的无图条目共用同一文字卡容器
    let matrix = null;

    c.features.items.forEach((feature) => {
        if (!feature.image) {
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

        const media = el('div', 'feature-media');
        const img = el('img', 'feature-img');
        img.src = feature.image;
        img.alt = feature.title;
        img.loading = 'lazy';
        // 图片加载失败时隐藏，避免显示破图
        img.onerror = () => img.classList.add('img-missing');
        media.appendChild(img);

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

/**
 * 版本动态时间线
 * @param {object} c 文案数据
 * @param {number} limit 显示条数上限；0 或负数表示全部（news 页）
 */
function renderUpdates(c, limit) {
    setSectionHead('updates-head', c.updates.title, c.updates.tag);
    const intro = document.getElementById('updates-intro');
    if (intro) {
        intro.textContent = c.updates.note || '';
    }

    const list = document.getElementById('updates-list');
    if (!list) {
        return;
    }
    list.textContent = '';

    const entries = limit > 0 ? c.updates.entries.slice(0, limit) : c.updates.entries;

    entries.forEach((entry) => {
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

    // 首页的"查看全部"入口
    const more = document.getElementById('updates-more');
    if (more) {
        more.textContent = c.updates.moreLabel + ' →';
    }
}

// 首页的上手指南切片：复用 guide.steps 渲染紧凑列表 + 完整版入口
function renderGuideTeaser(c) {
    setSectionHead('guide-head', c.guide.title, c.guide.tag);
    const intro = document.getElementById('guide-intro');
    if (intro) {
        intro.textContent = c.guide.intro;
    }

    const box = document.getElementById('guide-teaser');
    if (box) {
        box.textContent = '';
        c.guide.steps.forEach((step) => {
            const row = el('div', 'teaser-row reveal');
            row.appendChild(el('span', 'teaser-index', step.index));
            row.appendChild(el('span', 'teaser-title', step.title));
            row.appendChild(el('span', 'teaser-body', step.body));
            box.appendChild(row);
        });
    }

    const more = document.getElementById('guide-more');
    if (more) {
        more.textContent = (c.guide.moreLabel || '') + ' →';
    }
}

// 版权声明（折叠面板内）
function renderLegal(c) {
    const label = document.getElementById('legal-fold-label');
    if (label) {
        label.textContent = c.legal.foldLabel || c.legal.title;
    }
    const hint = document.getElementById('legal-fold-hint');
    if (hint) {
        hint.textContent = c.legal.foldHint || '';
    }

    const blocks = document.getElementById('legal-blocks');
    if (!blocks) {
        return;
    }
    blocks.textContent = '';

    c.legal.blocks.forEach((block) => {
        const blockEl = el('article', 'legal-block');
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

function renderContact(c) {
    setSectionHead('contact-head', c.contact.title, c.contact.tag);
    const note = document.getElementById('contact-note');
    if (note) {
        note.textContent = c.contact.note;
    }

    const grid = document.getElementById('contact-grid');
    if (!grid) {
        return;
    }
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

// ==================== 版本动态页 / 上手指南页 ====================

// 二级页页面头（标题 + 角标 + 引言）
function renderPageHead(title, tag, intro) {
    const t = document.getElementById('page-title');
    if (t) {
        t.textContent = title;
    }
    const g = document.getElementById('page-tag');
    if (g) {
        g.textContent = tag;
    }
    const i = document.getElementById('page-intro');
    if (i) {
        i.textContent = intro || '';
    }
}

// 二级页页尾动作（去玩最新版 + 返回首页）
function renderPageActions(c) {
    const play = document.getElementById('page-play');
    if (play) {
        play.textContent = c.hero.cta.playLabel;
        play.href = SITE_CONFIG.links.play;
        play.target = '_blank';
        play.rel = 'noopener';
    }

    const backLabel = (c.newsPage && c.newsPage.backLabel)
        || (c.guide && c.guide.backLabel)
        || '';
    ['page-back', 'page-back-bottom'].forEach((id) => {
        const a = document.getElementById(id);
        if (a) {
            a.textContent = backLabel;
        }
    });
}

// 版本状态（列表项由配置 items 驱动）
function renderNotices(c) {
    setSectionHead('notices-head', c.notices.title, c.notices.tag);
    const intro = document.getElementById('notices-intro');
    if (intro) {
        intro.textContent = c.notices.note || '';
    }

    const list = document.getElementById('notices-list');
    if (!list) {
        return;
    }
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

// 上手指南：步骤 + 键位表 + 常见问题
function renderGuide(c) {
    setSectionHead('steps-head', c.guide.stepsTitle);
    setSectionHead('keys-head', c.guide.keysTitle);
    setSectionHead('faq-head', c.guide.faqTitle);

    const keysNote = document.getElementById('keys-note');
    if (keysNote) {
        keysNote.textContent = c.guide.keysNote || '';
    }

    // 步骤卡
    const stepsList = document.getElementById('steps-list');
    if (stepsList) {
        stepsList.textContent = '';
        c.guide.steps.forEach((step) => {
            const card = el('article', 'step-card reveal');
            card.appendChild(el('span', 'step-index', step.index));
            card.appendChild(el('h3', 'step-title', step.title));
            card.appendChild(el('p', 'step-body', step.body));
            stepsList.appendChild(card);
        });
    }

    // 键位表
    const keyTable = document.getElementById('key-table');
    if (keyTable) {
        keyTable.textContent = '';
        c.guide.keys.forEach((row) => {
            const item = el('div', 'key-row');
            item.appendChild(el('span', 'key-name', row.key));
            item.appendChild(el('span', 'key-desc', row.desc));
            keyTable.appendChild(item);
        });
    }

    // 常见问题
    const faqList = document.getElementById('faq-list');
    if (faqList) {
        faqList.textContent = '';
        c.guide.faq.forEach((item) => {
            const fold = el('details', 'faq-item reveal');
            fold.appendChild(el('summary', 'faq-q', item.q));
            fold.appendChild(el('p', 'faq-a', item.a));
            faqList.appendChild(fold);
        });
    }
}

// ============================ 页脚 ============================

function renderFooter(c) {
    const brand = document.getElementById('footer-brand');
    if (brand) {
        brand.textContent = c.footer.brand;
    }
    const copy = document.getElementById('footer-copy');
    if (copy) {
        copy.textContent = c.footer.copyright;
    }
    const note = document.getElementById('footer-note');
    if (note) {
        note.textContent = c.footer.note;
    }

    // 版本信息来自站点配置（单一事实源）
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
 * 渲染当前页面的全部内容（按当前语言）
 */
export function renderAll() {
    const c = I18n.getContent();

    if (PAGE === 'news') {
        renderPageHead(c.updates.title, c.updates.tag, c.newsPage.intro);
        renderUpdates(c, 0);
        renderNotices(c);
        renderPageActions(c);
    } else if (PAGE === 'guide') {
        renderPageHead(c.guide.title, c.guide.tag, c.guide.intro);
        renderGuide(c);
        renderPageActions(c);
    } else {
        renderHero(c);
        renderAbout(c);
        renderFeatures(c);
        renderUpdates(c, c.updates.previewCount || 3);
        renderGuideTeaser(c);
        renderContact(c);
        renderLegal(c);
    }

    renderFooter(c);
}

/**
 * 初始化内容渲染：首次渲染并监听语言切换
 */
export function initSections() {
    renderAll();
    EventBus.on('language-changed', renderAll);
}
