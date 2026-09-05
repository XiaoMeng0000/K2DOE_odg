'use strict';

// ==========================================================================
// 中文站点文案（数据驱动：所有页面文本都从这里读取）
// 注意：文本内容对齐游戏本体 0.2.4 正式版；版本迭代后需同步更新
// ==========================================================================

export const CONTENT_ZH = {
    // —— 顶部导航 ——
    nav: {
        links: [
            { id: 'hero', label: '任务简报' },
            { id: 'about', label: '游戏简介' },
            { id: 'features', label: '游戏特色' },
            { id: 'updates', label: '版本动态' },
            { id: 'notices', label: '版本状态' },
            { id: 'legal', label: '版权声明' },
            { id: 'contact', label: '联系渠道' },
        ],
        // 语言切换按钮显示的目标语言名
        langSwitchTo: 'EN',
    },

    // —— 板块一：Hero ——
    // 公测时间未到：显示倒计时；时间已过（正式运营中）：显示标题 + 版本行 + CTA
    hero: {
        // 倒计时文案（仅未发布预告期可见）
        countdownLabel: '距离公测开启还有',
        units: {
            days: '天',
            hours: '时',
            minutes: '分',
            seconds: '秒',
        },
        // 正式运营状态文案
        launched: '正式运营中',
        launchedSub: '轨道工程师 v0.2.4 正式版已发布 — 从 Kerbin 出发，把补给网络铺向整个 Kerbol 星系。',
        // CTA 按钮（「立即试玩」链接见 site-config.js links.play）
        cta: {
            playLabel: '立即试玩',
        },
    },

    // —— 板块二：游戏简介 ——
    about: {
        title: '游戏简介',
        tag: '// ABOUT',
        body: '坎巴拉太空计划2D:轨道工程师是一款以真实轨道力学为核心的 2D 太空沙盒游戏。'
            + '驾驶你的飞船变轨、交会、远征，在 Kerbol 星系的行星与卫星上部署设施、运输补给，'
            + '把后勤网络铺满整个星系——从"把飞船送上天"，到"经营一张跨星球的物流网"。'
            + '游戏采用开普勒解析解与 RK4 数值积分双引擎，轨道就像被看不见的尺子精确测量。'
            + '0.2.3 公测架起了完整可玩的轨道框架，0.2.4 正式版又带来资源经济、货运物流与设施经营。'
            + '变轨失败？没事，读档再来！',
    },

    // —— 板块三：游戏特色 ——
    // 前 3 项带实机截图（左右交替），后 3 项为无图文字卡（不配 image/imageSide 即为文字卡）
    features: {
        title: '游戏特色',
        tag: '// FEATURES',
        intro: '// 玩法矩阵 · FEATURE MATRIX',
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
                description: '开普勒轨道滑行、RK4 推力积分、SOI 引力接管与轨道预测，时间加速跨 SOI 自动保护、拱点机动不再冲过头。轨道，就像被看不见的尺子量过。',
            },
            {
                id: 'vessel',
                index: '##FEATURE_02',
                imageSide: 'right',
                image: 'assets/images/screenshots/02.jpg',
                title: '飞船装配',
                subtitle: 'MODULAR VESSEL SYSTEM',
                description: '模块化船体、SAS 姿态控制与氢氧分槽燃料；飞行 HUD 实时读出每槽余量与总 ΔV。燃料耗尽？引擎 engineOut 停机——补给后即可重新点火。',
            },
            {
                id: 'facility',
                index: '##FEATURE_03',
                imageSide: 'left',
                image: 'assets/images/screenshots/03.jpg',
                title: '设施部署与物流',
                subtitle: 'FACILITY & LOGISTICS',
                description: '在稳定轨道上部署指令舱、补给站与对接枢纽，每座设施拥有独立存储；货运模块运载货物，材料套装建造飞船，补给链路让每一艘回家的飞船都有码头可停。',
            },
            {
                id: 'economy',
                index: '##FEATURE_04',
                title: '资源经济',
                subtitle: 'RESOURCE ECONOMY',
                description: '燃料按引擎配方分槽（液氢:液氧 = 1:8），总质量随推进剂实时变化；科技点、材料套装与设施存储构成完整经济——从发射到补给，每一克都要精打细算。',
            },
            {
                id: 'modes',
                index: '##FEATURE_05',
                title: '自由与生涯',
                subtitle: 'SANDBOX & CAREER',
                description: '自由模式：蓝图全解锁、余额不设限，纯粹的沙盒。生涯模式：科技点解锁蓝图、天体资源必须主动扫描——带上资源扫描仪，先探明，再开采。',
            },
            {
                id: 'interface',
                index: '##FEATURE_06',
                title: '界面与视听',
                subtitle: 'DOM UI & AUDIO',
                description: '全 DOM 的 KSP2 风格面板体系：可拖动面板、实时 HUD 与终端式菜单；按天体类型区分的飞行 BGM、SOI 切换音效与屏幕空间天空盒。',
            },
        ],
    },

    // —— 板块四：版本动态（时间线；内容随游戏公告迭代，摘要级维护） ——
    updates: {
        title: '版本动态',
        tag: '// UPDATES',
        note: '沿着版本时间线，看轨道工程师如何一步步走到今天。',
        // entries 自上而下渲染；version 徽章 + date（可空）+ title + 要点列表
        entries: [
            {
                // 常驻条目：当前制作节奏说明（无版本号徽章置顶）
                version: '近期动态',
                title: '制作节奏调整',
                items: [
                    '0.2.4 正式版发布后，逃逸速度的内容产出将转为小更新节奏：聚焦问题修复、体验打磨与小幅功能增强，不再追求每次都是大版本。',
                    '每次小更新都会体现在游戏公告栏与版本号中。开发没有停止，你的反馈依然是最重要的输入。',
                ],
            },
            {
                version: 'v0.2.4',
                title: '轨道工程师 0.2.4 正式版',
                date: '2026-09',
                items: [
                    '飞行状态 HUD：燃料卡与总 ΔV 实时读数，引擎 engineOut 时整卡切红',
                    '可拖动多面板体系，工具栏面板多实例并存',
                    '时间加速面板重制 + 拱点加速提前停表保护',
                    '设施部署扣费规则修正：自由模式回归纯沙盒',
                ],
            },
            {
                version: 'v0.2.4beta',
                title: '0.2.4 beta：玩法层大更新',
                date: '2026-08',
                items: [
                    '资源系统：氢/氧分槽 + 引擎配方消耗 + engineOut 停机恢复',
                    '货运与设施：轨道部署、独立存储、补给链路、材料套装',
                    '自由 / 生涯双模式与天体主动扫描',
                    '全 DOM 的 KSP2 面板体系与 UI 重构',
                    '星系配置：多星系组合选择与家园绑定（测试功能）',
                ],
            },
            {
                version: 'v0.2.3',
                title: '首次公开测试',
                date: '2026-08',
                items: [
                    '第一个完整可玩框架：轨道力学、建造、SAS 与时间加速',
                    'Kerbolar 系 16 颗天体全部实装：从 Kerbol 到 Eeloo',
                    '追踪站全局监控、星系图鉴、音频系统',
                ],
            },
        ],
    },

    // —— 板块五：版本状态（当前版本的务实说明，替代旧"公测需知"） ——
    notices: {
        title: '版本状态',
        tag: '// VERSION STATUS',
        // 板块说明（不需要可置空）
        note: '',
        // 状态条目
        items: [
            '最新正式版 v0.2.4；开发中版本 v0.2.5-alpha。版本详情见上方「版本动态」。',
            '已知问题：游戏为 2D 无倾角模型，Jool 与 Eeloo 轨道几何相交。经 19 年时长推演验证，当前初始相位下最小中心距约为 SOI 半径和的 3 倍，实际不重叠；后续若调整轨道相位需重新评估。',
            '星系配置为测试功能：占位星系（Debdeb / Tuun）仅展示数据、暂不可选择；Testbolar 系沿用早期原型缩放尺度，设施对接范围视觉偏大，属预期现象。',
            '在线试玩（浏览器版）与本地版的存档相互独立，进度不互通。',
            '遇到问题欢迎通过下方联系渠道反馈，每一条反馈都会成为下一版的方向。',
        ],
    },

    // —— 板块六：版权声明 ——
    legal: {
        title: '版权声明',
        tag: '// LEGAL NOTICE',
        blocks: [
            {
                id: 'positioning',
                label: '// 项目定位',
                lines: [
                    'KSP 2D:轨道工程师是一款粉丝自制（非官方）的二维轨道工程游戏，向 Kerbal Space Program（坎巴拉太空计划）系列经典作品致敬。',
                    '本项目由[逃逸速度]开发组独立制作，与原作开发方无任何从属关系。',
                ],
            },
            {
                id: 'sources',
                label: '// 资源来源声明',
                lines: [
                    '本游戏中的部分美术资源、音频资源、名称及玩法灵感来源于 Kerbal Space Program 系列。',
                    '上述内容的知识产权归其版权方所有（Squad / Intercept Games / Private Division 等）。',
                ],
            },
            {
                id: 'usage',
                label: '// 版权与用途',
                lines: [
                    '本项目仅用于学习、交流与技术研究，不以任何形式用于商业用途。',
                    '我们尊重并支持原作的版权。若版权方对相关资源的使用有任何异议，欢迎通过游戏内反馈渠道与我们联系，我们将第一时间处理。',
                ],
            },
            {
                id: 'original',
                label: '// 原创内容',
                lines: [
                    '除上述第三方资源外，本项目的原创代码与原创美术由[逃逸速度]开发组保留权利。',
                ],
            },
        ],
    },

    // —— 板块七：联系渠道 ——
    contact: {
        title: '联系渠道',
        tag: '// CONTACT',
        note: '遇到 Bug、有建议，或想提前聊聊你的飞船设计？随时联系我们。',
        // 一键复制按钮文案
        copyLabel: '复制',
        copiedLabel: '已复制',
        channels: [
            {
                id: 'qq',
                badge: 'QQ',
                label: 'QQ',
                hint: '// DIRECT MESSAGE',
                value: '1570447677',
                url: 'https://wpa.qq.com/msgrd?v=3&uin=1570447677&site=qq&menu=yes',
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
