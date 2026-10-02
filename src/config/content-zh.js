'use strict';

// ==========================================================================
// 中文站点文案（数据驱动：所有页面文本都从这里读取）
// 结构：nav / hero / about / features / updates / notices / legal / contact /
//       guide / newsPage / footer —— 三个页面（index / news / guide）共用本文件
// 注意：文本内容对齐游戏本体最新正式版；版本迭代后需同步更新
// ==========================================================================

export const CONTENT_ZH = {
    // —— 站点导航（跨页；三页共用） ——
    nav: {
        links: [
            { id: 'home', label: '首页', href: 'index.html' },
            { id: 'features', label: '玩法特色', href: 'index.html#features' },
            { id: 'news', label: '版本动态', href: 'index.html#updates' },
            { id: 'guide', label: '上手指南', href: 'index.html#guide' },
            { id: 'contact', label: '联系我们', href: 'index.html#contact' },
        ],
        // 语言切换按钮显示的目标语言名
        langSwitchTo: 'EN',
    },

    // —— 首页 · Hero ——
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
        launchedSub: '轨道工程师 v0.2.6 正式版已发布 —— 现在，你可以把整段任务的点火计划画在轨道上。',
        // 技术规格行（等宽数据条，用于 Hero 下方的仪器感信息）
        specs: [
            '16 颗天体',
            '开普勒 + RK4 双引擎',
            '1000 万倍时间加速',
            '零依赖浏览器运行',
        ],
        // CTA 按钮（「立即试玩」链接见 site-config.js links.play）
        cta: {
            playLabel: '立即试玩',
        },
    },

    // —— 首页 · 游戏简介 ——
    about: {
        title: '游戏简介',
        tag: 'ABOUT',
        body: '坎巴拉太空计划2D:轨道工程师是一款以真实轨道力学为核心的 2D 太空沙盒游戏。'
            + '驾驶飞船变轨、交会、远征，在 Kerbol 星系的行星与卫星上部署设施、运输补给，'
            + '把后勤网络铺满整个星系——从"把飞船送上天"，到"经营一张跨星球的物流网"。'
            + '轨道由开普勒解析解与 RK4 数值积分双引擎驱动，变轨可以精确到米每秒。'
            + '0.2.3 公测架起完整可玩的轨道框架，0.2.4 带来资源经济与设施经营，'
            + '0.2.5 与 0.2.6 则让"规划机动"成为可能：在轨道上落点、拉出手柄、串成一条任务链。'
            + '变轨失败？没事，读档再来！',
    },

    // —— 首页 · 玩法特色 ——
    // 带 image 的条目左右交替；不带 image 的条目渲染为文字卡（两列矩阵）
    features: {
        title: '玩法特色',
        tag: 'FEATURES',
        intro: '玩法矩阵 · FEATURE MATRIX',
        items: [
            {
                id: 'mechanics',
                index: '01',
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
                index: '02',
                imageSide: 'right',
                image: 'assets/images/screenshots/02.jpg',
                title: '飞船装配',
                subtitle: 'MODULAR VESSEL SYSTEM',
                description: '模块化船体、SAS 姿态控制与分槽燃料；飞行 HUD 实时读出每槽余量与总 ΔV。燃料耗尽？引擎 engineOut 停机——补给后即可重新点火。',
            },
            {
                id: 'facility',
                index: '03',
                imageSide: 'left',
                image: 'assets/images/screenshots/03.jpg',
                title: '设施部署与物流',
                subtitle: 'FACILITY & LOGISTICS',
                description: '在稳定轨道上部署轨道船坞、补给站与科研站，每座设施拥有独立存储；货运模块运载货物，材料套装建造飞船，补给链路让每一艘回家的飞船都有码头可停。',
            },
            {
                id: 'maneuver',
                index: '04',
                title: '机动节点规划',
                subtitle: 'MANEUVER PLANNING',
                description: '在轨道线上点击落下节点，拖动四个方向手柄注入 Δv，预测线即时重算——红线是燃烧段，粉线是机动后的新轨道。按 V 进入轨道机动视图看全局，在一条链上串行规划多个节点，像排一份任务清单。',
            },
            {
                id: 'economy',
                index: '05',
                title: '资源经济',
                subtitle: 'RESOURCE ECONOMY',
                description: '分级推进剂（液氢 / 液氧 / 甲烷 / 单组元 / 氙 / 氦-3 / 反物质）、原料（水冰 / 金属矿石 / 稀土矿 / 裂变材料）、建造材料与科技点，配合货运、扫描与设施存储形成生产链——每一克都要精打细算。',
            },
            {
                id: 'modes',
                index: '06',
                title: '自由与生涯',
                subtitle: 'SANDBOX & CAREER',
                description: '自由模式：蓝图全解锁、余额不设限，纯粹的沙盒。生涯模式：科技点解锁蓝图、天体资源必须主动扫描——带上资源扫描仪，先探明，再开采。还可选择要加载的星系组合。',
            },
            {
                id: 'interface',
                index: '07',
                title: '界面与存档',
                subtitle: 'DOM UI & SAVES',
                description: '全 DOM 的 KSP2 风格面板：可拖动多面板、实时飞行 HUD 与终端式菜单；战役与检查点两级存档，支持世界导入导出——把你的星系打包带走或分享。',
            },
        ],
    },

    // —— 版本动态（首页显示前 previewCount 条，news.html 显示全部） ——
    updates: {
        title: '版本动态',
        tag: 'UPDATES',
        note: '沿着版本时间线，看轨道工程师如何一步步走到今天。',
        // 首页预览条数
        previewCount: 3,
        moreLabel: '查看全部版本动态',
        // entries 自上而下渲染；version 徽章 + date（可空）+ title + 要点列表
        entries: [
            {
                // 常驻条目：当前制作节奏（无版本号徽章）
                version: '近期动态',
                title: '当前节奏：小步更新',
                items: [
                    '自 0.2.4 起，逃逸速度转向小步更新：聚焦问题修复、体验打磨与小幅功能增强，0.2.5、0.2.6 都是这个节奏下的产物。',
                    '0.3.0 已在开发中：底层配置重构与时间加速机制先行，为后续更大规模的内容与画面升级铺路。',
                ],
            },
            {
                version: 'v0.2.6',
                title: '机动节点：一条链上串行规划',
                date: '2026-09-18',
                items: [
                    '同一艘飞船可挂载多个机动节点，新节点接在计划的末端，形成一条串行计划链',
                    '选中节点与执行目标分离：◀ i/N ▶ 循环切换，SAS 与加速按钮始终指向下一个未完成节点',
                    '修改前序节点的 Δv 或时刻，后续节点自动跟随重算，方向语义与质量快照一并更新',
                    '「游戏公告」提升为主菜单一级入口，看公告少点一层',
                ],
            },
            {
                version: 'v0.2.5',
                title: '机动节点系统与轨道机动视图',
                date: '2026-09-12',
                items: [
                    '机动节点：在轨道上落点、拉手柄注入 Δv、预测燃烧段与新轨道，燃料耗尽点一目了然',
                    '轨道机动视图（按 V）：局部放大图 + 节点编辑面板，可直接创建节点、按周期整圈平移寻找转移窗口',
                    'SAS 新增「节点」指向：一键对准加速方向，点火即按计划执行',
                    '世界导入导出：存档可导出成文件跨设备迁移或分享给其他玩家',
                    '高清屏适配、存档可靠性加固，以及一轮渲染与 UI 性能治理',
                ],
            },
            {
                version: 'v0.2.4',
                title: '资源经济与设施经营',
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
                title: '玩法层大更新',
                date: '2026-08',
                items: [
                    '资源系统：分槽燃料 + 引擎配方消耗 + engineOut 停机恢复',
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

    // —— 版本状态（news.html；当前版本的务实说明） ——
    notices: {
        title: '版本状态',
        tag: 'VERSION STATUS',
        // 板块说明（不需要可置空）
        note: '',
        items: [
            '最新正式版 v0.2.6；开发中版本 v0.3.0-alpha（预发布）。完整变更见上方时间线。',
            '机动节点的进度跟踪针对当前受控飞船：切换飞船后节点数据随存档保留，但进度只在受控飞船上推进。',
            '多节点计划按帧分摊重算：节点非常多时，靠近链尾的新节点可能晚一两帧才显示完整预测，属预期行为。',
            '已知问题：游戏为 2D 无倾角模型，Jool 与 Eeloo 轨道几何相交。经 19 年时长推演验证，当前初始相位下最小中心距约为 SOI 半径和的 3 倍，实际不重叠；后续若调整轨道相位需重新评估。',
            '星系配置为测试功能：占位星系（Debdeb / Tuun）仅展示数据、暂不可选择；Testbolar 系沿用早期原型缩放尺度，设施对接范围视觉偏大，属预期现象。',
            '在线试玩（浏览器版）与本地版的存档相互独立，进度不互通。',
            '遇到问题欢迎通过联系渠道反馈，每一条反馈都会成为下一版的方向。',
        ],
    },

    // —— 首页 · 版权声明（默认折叠，点击展开全文） ——
    legal: {
        title: '版权声明',
        tag: 'LEGAL NOTICE',
        foldLabel: '版权与项目声明',
        foldHint: '同人作品 · 非商业 · 点击展开全文',
        blocks: [
            {
                id: 'positioning',
                label: '项目定位',
                lines: [
                    'KSP 2D:轨道工程师是一款粉丝自制（非官方）的二维轨道工程游戏，向 Kerbal Space Program（坎巴拉太空计划）系列经典作品致敬。',
                    '本项目由[逃逸速度]开发组独立制作，与原作开发方无任何从属关系。',
                ],
            },
            {
                id: 'sources',
                label: '资源来源声明',
                lines: [
                    '本游戏中的部分美术资源、音频资源、名称及玩法灵感来源于 Kerbal Space Program 系列。',
                    '上述内容的知识产权归其版权方所有（Squad / Intercept Games / Private Division 等）。',
                ],
            },
            {
                id: 'usage',
                label: '版权与用途',
                lines: [
                    '本项目仅用于学习、交流与技术研究，不以任何形式用于商业用途。',
                    '我们尊重并支持原作的版权。若版权方对相关资源的使用有任何异议，欢迎通过反馈渠道与我们联系，我们将第一时间处理。',
                ],
            },
            {
                id: 'original',
                label: '原创内容',
                lines: [
                    '除上述第三方资源外，本项目的原创代码与原创美术由[逃逸速度]开发组保留权利。',
                ],
            },
        ],
    },

    // —— 联系我们（首页） ——
    contact: {
        title: '联系我们',
        tag: 'CONTACT',
        note: '遇到 Bug、有建议，或想聊聊你的飞船设计？随时联系我们。',
        // 一键复制按钮文案
        copyLabel: '复制',
        copiedLabel: '已复制',
        channels: [
            {
                id: 'qqgroup',
                badge: '群',
                label: 'QQ 群',
                hint: 'COMMUNITY',
                value: '1098073419',
                url: 'https://qm.qq.com/q/1098073419',
            },
            {
                id: 'qq',
                badge: 'QQ',
                label: '开发者 QQ',
                hint: 'DIRECT MESSAGE',
                value: '1570447677',
                url: 'https://wpa.qq.com/msgrd?v=3&uin=1570447677&site=qq&menu=yes',
            },
            {
                id: 'email',
                badge: '@',
                label: 'E-MAIL',
                hint: 'SEND FEEDBACK',
                value: 'mc1234com@163.com',
                url: 'mailto:mc1234com@163.com',
            },
        ],
    },

    // —— 上手指南（guide.html） ——
    guide: {
        title: '上手指南',
        tag: 'GETTING STARTED',
        intro: '三步开始第一次变轨。更完整的说明在游戏内「百科」中。',
        stepsTitle: '开始游戏',
        steps: [
            {
                index: '01',
                title: '打开游戏',
                body: '直接访问在线版即可开玩，无需安装；也可以克隆仓库后本地运行（node server.js，浏览器打开 localhost:3000）。首次启动需要加载图片、音频与字体，稍等片刻。',
            },
            {
                index: '02',
                title: '建立战役',
                body: '在主菜单创建新战役：选择自由模式（资源不设限，适合熟悉操作）或生涯模式（严格经济、蓝图需科技点解锁），并勾选要加载的星系组合。',
            },
            {
                index: '03',
                title: '入轨',
                body: '在轨道船坞装配飞船并建造。起飞后按 G 把飞船对准顺向，Shift 推油门、Z 拉满；把远点抬到目标高度后关机滑行，在远点再次点火圆化轨道。',
            },
            {
                index: '04',
                title: '规划机动',
                body: '在轨道线上点击创建机动节点，拖动手柄注入 Δv，画面会实时画出燃烧段与新轨道；按 V 进入轨道机动视图查看全局与转移窗口；SAS 切到「节点」对准后点火。',
            },
        ],
        keysTitle: '常用键位',
        keysNote: '完整键位与图文说明见游戏内「百科 → 基础操作 / 轨道飞行」。',
        keys: [
            { key: 'A / D', desc: '飞船左转 / 右转' },
            { key: 'Shift / Ctrl', desc: '渐增 / 渐减油门' },
            { key: 'Z / X', desc: '油门拉满 / 归零' },
            { key: 'T', desc: 'SAS 姿态保持 开 / 关' },
            { key: 'G', desc: '循环切换 SAS 指向（顺向 / 逆向 / 径向内 / 径向外）' },
            { key: ', / .', desc: '降低 / 提高时间加速档位（降至 0x 即暂停）' },
            { key: '\\', desc: '时间复位到 1x' },
            { key: 'Alt + , / .', desc: '1x ~ 4x 之间精细微调时间' },
            { key: 'V', desc: '切换轨道机动视图（规划变轨）' },
            { key: 'B', desc: '靠近设施时打开设施交互面板' },
            { key: '鼠标滚轮', desc: '缩放画面' },
            { key: '点击天体 / 设施', desc: '让镜头聚焦过去' },
            { key: 'Esc', desc: 'ESC 菜单（设置、存档、返回主菜单等）' },
        ],
        faqTitle: '常见问题',
        faq: [
            {
                q: '需要下载安装吗？',
                a: '不需要。点击「立即试玩」即可在浏览器里直接开玩；想离线玩可以克隆仓库后用 node server.js 在本地运行。',
            },
            {
                q: '存档存在哪里？在线版和本地版互通吗？',
                a: '存档保存在浏览器本地存储中，两者相互独立、互不迁移。0.2.5 起支持「导出世界 / 导入世界」，可以手动把存档打包带走或分享。',
            },
            {
                q: '支持哪些浏览器？',
                a: 'Chrome / Edge / Firefox 等现代桌面浏览器均可，需要支持 ES Module 与 Web Audio。为保证手感，建议使用桌面端并保持窗口足够大。',
            },
            {
                q: '时间加速时飞船不响应操作？',
                a: '这是设计如此：时间加速期间操控输入会被忽略。想调整姿态或点火，先把时间降回 1x（按「\\」一键复位）。',
            },
            {
                q: '卡顿怎么办？',
                a: '高倍时间加速、多飞船与大量设施会吃性能。可以关闭不用的面板、降低时间档位，或缩小视野范围减少绘制量。',
            },
        ],
        moreLabel: '查看完整上手指南（键位表与常见问题）',
        backLabel: '← 返回首页',
    },

    // —— 版本动态页（news.html）页面级文案 ——
    newsPage: {
        intro: '与游戏内公告栏同步维护的完整版本时间线。每条要点都是这一版真正落地的东西。',
        backLabel: '← 返回首页',
    },

    // —— 页脚 ——
    footer: {
        brand: 'KSP2D:OE',
        copyright: '© 2026 KSP2D:OE — 坎巴拉太空计划2D:轨道工程师',
        note: '本网站与游戏均为同人/学习项目，与 Kerbal Space Program 官方无关。',
    },
};
