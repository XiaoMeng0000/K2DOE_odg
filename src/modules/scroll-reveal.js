'use strict';

// ==========================================================================
// 滚动渐入动效模块
// 用 IntersectionObserver 监测元素进入视口，为其添加 .in 类触发过渡动画
// 用 MutationObserver 监听 DOM 变化，自动观察新出现的 .reveal 元素，
// 保证数据驱动重建板块（如切换语言）后动效依然生效
// ==========================================================================

// 进入视口多少比例后触发（0~1）
const VISIBLE_THRESHOLD = 0.12;

/**
 * 初始化滚动渐入动效
 * 观察所有 .reveal 元素，进入视口后添加 .in 类并解除观察
 * 与白页兜底的分工：初始隐藏态由 CSS 的 `html.js .reveal` 承担（无 JS 时正文直接可见，
 * 见 css/main.css「滚动渐入动效」段与三个页面的 head 内联切类），本模块只负责“何时显示”
 */
export function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        // 不支持 IntersectionObserver：立即显示全部内容，不做动效
        document.querySelectorAll('.reveal').forEach((t) => t.classList.add('in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: VISIBLE_THRESHOLD,
    });

    // 观察当前及后续出现的所有 .reveal 元素
    function observeAll() {
        document.querySelectorAll('.reveal:not(.in)').forEach((t) => observer.observe(t));
    }

    observeAll();

    // 语言切换等操作会重建板块 DOM，新增的 .reveal 需要重新挂载观察
    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
