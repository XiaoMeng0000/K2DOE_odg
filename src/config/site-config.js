'use strict';

// ==========================================================================
// 站点全局配置（数据驱动核心：修改本文件即可调整站点行为，无需改动代码）
// ==========================================================================

export const SITE_CONFIG = {
    // —— 站点名称 ——
    name: {
        zh: '坎巴拉太空计划2D:轨道工程师',
        en: 'Kerbal Space Program 2D: Orbit Engineer',
    },
    shortName: 'KSP2D:OE',

    // —— 公测时间（倒计时目标，历史值） ——
    // 说明：2026-08-13 00:00:00（按访问者浏览器本地时区计算）
    // JS 月份从 0 开始，8 月 = 7
    // 当前系统时间已超过该时间 → 站点自动进入"正式运营"状态（冻结倒计时 + CTA 入口）
    launchDate: new Date(2026, 7, 13, 0, 0, 0, 0),

    // —— 版本信息（页脚 / Hero 状态行共用，单一事实源） ——
    // version   ：最新正式版（对外展示的当前版本）
    // devVersion：开发中版本（页脚与状态行以 "dev xxx" 小标展示；无开发版时置空）
    version: 'v0.2.4',
    devVersion: 'v0.2.5-alpha',

    // —— 站点链接 ——
    links: {
        // 游戏本体 GitHub Pages（Hero「立即试玩」按钮目标；上线前请人工确认 URL 可访问）
        play: 'https://xiaomeng0000.github.io/ksp-2d/',
    },

    // —— 资源路径 ——
    assets: {
        logo: 'assets/images/logo.png',
        screenshots: 'assets/images/screenshots/',
    },
};
