'use strict';

// ==========================================================================
// 截图画廊（原生 <dialog>，零依赖）
// 分工：触发元素由 sections.js 渲染成 <button class="feature-media">，
//       本模块只负责“打开之后发生什么”，并在不支持原生模态对话框时回收可交互性。
// 无 JS 时触发元素与对话框都不会被创建，因此不会留下“点了没反应”的假交互。
// 焦点管理：showModal() 自带焦点陷阱与 Esc 关闭；关闭后显式把焦点还给触发元素。
// ==========================================================================

import { EventBus } from '../core/event-bus.js';
import { I18n } from '../core/i18n.js';

// 模板占位符填充（文案本体在 src/config，这里只做 {key} 替换）
function fillTemplate(template, vars) {
    if (!template) {
        return '';
    }
    return Object.keys(vars).reduce(
        (text, key) => text.split('{' + key + '}').join(vars[key]),
        template
    );
}

// 原生模态对话框不可用（老浏览器）：把触发器还原为不可交互的容器，避免假交互
function degradeTriggers() {
    document.querySelectorAll('button.feature-media').forEach((btn) => {
        btn.disabled = true;
        btn.removeAttribute('aria-label');
    });
}

/**
 * 初始化截图画廊：创建对话框 + 委托绑定触发元素
 */
export function initLightbox() {
    if (typeof HTMLDialogElement === 'undefined'
        || typeof HTMLDialogElement.prototype.showModal !== 'function') {
        degradeTriggers();
        return;
    }

    const queryTriggers = () => Array.from(document.querySelectorAll('button.feature-media'));

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';

    const bar = document.createElement('div');
    bar.className = 'lightbox-bar';

    const counter = document.createElement('span');
    counter.className = 'lightbox-counter';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.type = 'button';

    const image = document.createElement('img');
    image.className = 'lightbox-img';
    image.alt = '';

    bar.appendChild(counter);
    bar.appendChild(closeBtn);
    dialog.appendChild(bar);
    dialog.appendChild(image);
    document.body.appendChild(dialog);

    // 关闭后需要把焦点还回去的触发元素（含序号：触发元素被重渲染时按序号兜底）
    let lastTrigger = null;
    let lastTriggerIndex = -1;

    function gallery() {
        return I18n.getContent().gallery || {};
    }

    // 语言切换：刷新对话框自身文案（触发元素的 aria-label 由 sections.js 重渲染）
    function applyLabels() {
        const g = gallery();
        dialog.setAttribute('aria-label', g.dialogLabel || '');
        closeBtn.textContent = g.closeLabel || '';
    }

    function open(trigger) {
        const thumb = trigger.querySelector('.feature-img');
        if (!thumb) {
            return;
        }
        const list = queryTriggers();
        lastTrigger = trigger;
        lastTriggerIndex = list.indexOf(trigger);
        image.src = thumb.currentSrc || thumb.src;
        image.alt = thumb.alt || '';
        counter.textContent = fillTemplate(gallery().counterFormat, {
            current: lastTriggerIndex + 1,
            total: list.length,
        });
        dialog.showModal();
    }

    // 事件委托：语言切换重渲染触发元素后不需要重新绑定
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest && e.target.closest('button.feature-media');
        if (!trigger || trigger.disabled) {
            return;
        }
        open(trigger);
    });

    // 关闭按钮：显式关闭（原生 <dialog> 只对 Esc 与 form[method=dialog] 自动关闭）
    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    // 点击遮罩（对话框自身空白区域）也能关闭
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

    // Esc 与按钮关闭都会走到这里：把焦点还给触发元素
    dialog.addEventListener('close', () => {
        const list = queryTriggers();
        const target = lastTrigger && document.contains(lastTrigger)
            ? lastTrigger
            : list[lastTriggerIndex];
        lastTrigger = null;
        lastTriggerIndex = -1;
        // 延后一拍：关闭时 UA 的焦点修复也在跑，落在最后才能保证焦点真的回到触发元素
        window.setTimeout(() => {
            if (target) {
                target.focus();
            }
        }, 0);
    });

    EventBus.on('language-changed', applyLabels);
    applyLabels();
}
