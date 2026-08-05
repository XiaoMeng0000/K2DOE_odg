'use strict';

// ==========================================================================
// 中文站点文案（数据驱动：所有页面文本都从这里读取）
// ==========================================================================

export const CONTENT_ZH = {
    // —— 顶部导航 ——
    nav: {
        links: [
            { id: 'hero', label: '任务简报' },
            { id: 'about', label: '游戏简介' },
            { id: 'features', label: '游戏特色' },
            { id: 'notices', label: '公测需知' },
            { id: 'contact', label: '联系渠道' },
        ],
        // 语言切换按钮显示的目标语言名
        langSwitchTo: 'EN',
    },

    // —— 板块一：公测倒计时 ——
    hero: {
        countdownLabel: '距离公测开启还有',
        units: {
            days: '天',
            hours: '时',
            minutes: '分',
            seconds: '秒',
        },
        launched: '公测已开启！',
        launchedSub: '欢迎来到 Kerbin 轨道 —— 准备点火吧，工程师。',
    },

    // —— 板块二：游戏简介 ——
    about: {
        title: '游戏简介',
        tag: '// ABOUT',
        body: '坎巴拉太空计划2D:轨道工程师是一款以真实轨道力学为核心的 2D 太空沙盒游戏。'
            + '指挥你的工程师们，从 Kerbin 出发，建造飞船、规划轨道、执行任务，'
            + '一步步把后勤网络铺满整个 Kerbol 星系。'
            + '游戏采用开普勒解析解与 RK4 数值积分双引擎，轨道就像被看不见的尺子精确测量。'
            + '变轨失败？没事，读档再来！',
    },

    // —— 板块三：游戏特色（实机画面，左右交替） ——
    features: {
        title: '游戏特色',
        tag: '// FEATURES',
        intro: '// 实机画面预览 · SCREENSHOT PREVIEW',
        items: [
            {
                id: 'mechanics',
                index: '##FEATURE_01',
                // 布局方向：'left' = 左图右文，'right' = 右图左文
                imageSide: 'left',
                // 实机截图路径（素材放入 assets/images/screenshots/ 后自动生效）
                image: 'assets/images/screenshots/01.jpg',
                title: '轨道力学',
                subtitle: 'KEPLER + RK4 ENGINE',
                description: '开普勒轨道滑行、RK4 推力积分、SOI 引力接管，轨道就像被看不见的尺子量过一样精准。变轨失败？没事，读档再来！',
            },
            {
                id: 'vessel',
                index: '##FEATURE_02',
                imageSide: 'right',
                image: 'assets/images/screenshots/02.jpg',
                title: '飞船系统',
                subtitle: 'MODULAR VESSEL SYSTEM',
                description: '从轨道船坞开始，给你的飞船装上各种模块，看着它的数值一点一点变化。毕竟飞船是你拼的，你说了算——炸了也算!',
            },
            {
                id: 'facility',
                index: '##FEATURE_03',
                imageSide: 'left',
                image: 'assets/images/screenshots/03.jpg',
                title: '设施系统',
                subtitle: 'FACILITY NETWORK',
                description: '轨道船坞、补给站、科研站，停靠、补给、改装、建造飞船、研究实验一气呵成。在 Kerbin 轨道上搭起你的后勤网络，让每一艘回家的飞船都有码头可停！',
            },
        ],
    },

    // —— 板块四：公测需知 ——
    notices: {
        title: '公测需知',
        tag: '// OPEN BETA NOTICE',
        // 板块说明（不需要可置空）
        note: '',
        // 公测须知内容
        items: [
            '轨道线渲染仍存在参考系问题，我们暂时无法彻底解决',
            'Kerbol 星系尚未搭建完成，当前仅开放 Kerbol 与 Kerbin 两颗天体',
            '飞船与设施系统仍未完善，模块种类、建造流程与设施功能都在持续迭代中',
            '还存在未知bug',
            '请大家放低期待，从实反馈，你们的每一条反馈，都会成为下一版的方向。感谢大家的耐心和支持。',
        ],
    },

    // —— 板块五：联系渠道 ——
    contact: {
        title: '联系渠道',
        tag: '// CONTACT',
        note: '遇到 Bug、有建议，或想提前聊聊你的飞船设计？随时联系我们。',
        channels: [
            {
                id: 'qq',
                badge: 'QQ',
                label: 'QQ',
                hint: '// DIRECT MESSAGE',
                value: '1570447677',
                url: 'tencent://message/?uin=1570447677',
            },
            {
                id: 'email',
                badge: '@',
                label: 'E-MAIL',
                hint: '// SEND FEEDBACK',
                value: 'mc1234com@163.com',
                url: 'mailto:mc1234com@163.com',
            },
        ],
    },

    // —— 页脚 ——
    footer: {
        brand: 'KSP2D:OE',
        copyright: '© 2026 KSP2D:OE — 坎巴拉太空计划2D:轨道工程师',
        note: '本网站与游戏均为同人/学习项目，与 Kerbal Space Program 官方无关。',
    },
};
