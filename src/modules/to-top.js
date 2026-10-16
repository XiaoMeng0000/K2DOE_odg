'use strict';

// ==========================================================================
// 回到顶部按钮
// 按钮由本模块创建：无 JS 时不存在，不会出现“看得见点不动”的假交互。
// 滚动超过约一屏后淡入；点击或键盘 Enter / Space 触发平滑回顶。
// ==========================================================================

import { EventBus } from '../core/event-bus.js';
import { I18n } from '../core/i18n.js';

// 出现阈值（屏数）：首页整页约 5600px，超过一屏即应能一键回顶
const SHOW_AFTER_SCREENS = 1;

/**
 * 初始化回到顶部按钮
 */
export function initToTop() {
    const content = () => I18n.getContent().toTop || {};

    const btn = document.createElement('button');
    btn.className = 'to-top';
    btn.type = 'button';

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↑';

    btn.appendChild(arrow);
    document.body.appendChild(btn);

    function applyLabel() {
        btn.setAttribute('aria-label', content().label || '');
    }

    // 阈值判定放在滚动回调里（被动监听，不做阻塞布局的读写）
    function syncVisibility() {
        btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * SHOW_AFTER_SCREENS);
    }

    btn.addEventListener('click', () => {
        // 页面已有 html { scroll-behavior: smooth }，这里显式声明同一行为，避免两套节奏打架
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', syncVisibility, { passive: true });
    window.addEventListener('resize', syncVisibility, { passive: true });
    window.addEventListener('hashchange', syncVisibility);
    // 深链（如 news.html#notices）落在页面中部时不产生滚动事件；浏览器完成锚点定位的时点
    // 又晚于 load，这里在锚点定位之后补一次判定（一次性的，不轮询）
    window.setTimeout(syncVisibility, 300);
    EventBus.on('language-changed', applyLabel);

    applyLabel();
    syncVisibility();
}
