'use strict';

// ==========================================================================
// 星空背景渲染模块（Canvas 2D 渲染层）
// 对应游戏的渲染层原则：本模块只负责绘制，不含任何业务逻辑
// 纯黑深空 + 闪烁星点 + 远处恒星光晕，参考 KSP2 全局 UI 的背景质感
// ==========================================================================

// 星点数量与恒星光晕数量
const STARS_COUNT = 280;
const GLOWS_COUNT = 6;

/**
 * 初始化星空背景动画
 * @param {HTMLCanvasElement} canvas 星空画布元素
 */
export function initStarfield(canvas) {
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let stars = [];
    let glows = [];
    let rafId = 0;

    // 生成一颗星星（随机位置、大小、闪烁相位）
    function makeStar() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: 0.4 + Math.random() * 1.3,
            phase: Math.random() * Math.PI * 2,
            speed: 0.0015 + Math.random() * 0.005,
            alpha: 0.35 + Math.random() * 0.65,
        };
    }

    // 生成一个恒星光晕（紫 / 蓝灰两色，呼应 KSP2 面板主色）
    function makeGlow() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: 60 + Math.random() * 90,
            color: Math.random() > 0.5 ? '90, 95, 207' : '110, 140, 200',
            alpha: 0.04 + Math.random() * 0.05,
        };
    }

    // 尺寸适配（含高清屏 dpr 处理）
    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stars = Array.from({ length: STARS_COUNT }, makeStar);
        glows = Array.from({ length: GLOWS_COUNT }, makeGlow);
    }

    // 绘制一帧
    function draw(now) {
        ctx.clearRect(0, 0, width, height);

        // 远处恒星光晕
        glows.forEach((g) => {
            const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
            grad.addColorStop(0, `rgba(${g.color}, ${g.alpha})`);
            grad.addColorStop(1, `rgba(${g.color}, 0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(g.x - g.r, g.y - g.r, g.r * 2, g.r * 2);
        });

        // 星点（正弦闪烁）
        stars.forEach((s) => {
            const a = s.alpha * (0.5 + 0.5 * Math.sin(now * s.speed + s.phase));
            ctx.globalAlpha = Math.max(0, Math.min(1, a));
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        rafId = requestAnimationFrame(draw);
    }

    // 页面不可见时暂停渲染，减少资源占用
    function onVisibilityChange() {
        cancelAnimationFrame(rafId);
        if (!document.hidden) {
            rafId = requestAnimationFrame(draw);
        }
    }

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(draw);
}
