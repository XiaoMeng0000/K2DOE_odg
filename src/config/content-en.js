'use strict';

// ==========================================================================
// 英文站点文案（与 content-zh.js 结构完全对应，双语切换时按同一 schema 读取）
// ==========================================================================

export const CONTENT_EN = {
    // —— Top navigation ——
    nav: {
        links: [
            { id: 'hero', label: 'MISSION BRIEF' },
            { id: 'about', label: 'ABOUT' },
            { id: 'features', label: 'FEATURES' },
            { id: 'notices', label: 'NOTICES' },
            { id: 'legal', label: 'COPYRIGHT' },
            { id: 'contact', label: 'CONTACT' },
        ],
        langSwitchTo: '中文',
    },

    // —— Section 1: Countdown ——
    hero: {
        countdownLabel: 'COUNTDOWN TO OPEN BETA',
        units: {
            days: 'DAYS',
            hours: 'HOURS',
            minutes: 'MINS',
            seconds: 'SECS',
        },
        launched: 'OPEN BETA IS LIVE!',
        launchedSub: 'Welcome to Kerbin orbit — fire it up, engineer.',
    },

    // —— Section 2: About ——
    about: {
        title: 'About the Game',
        tag: '// ABOUT',
        body: 'Kerbal Space Program 2D: Orbit Engineer is a 2D space sandbox built around real orbital mechanics. '
            + 'Lead your engineers from Kerbin outward — build vessels, plan orbits, run missions, '
            + 'and grow your logistics network across the Kerbol system. '
            + 'Driven by Kepler analytic solutions and RK4 numerical integration, orbits are measured with invisible precision. '
            + 'Miss your burn? No worries — reload and try again!',
    },

    // —— Section 3: Features (screenshots, alternating layout) ——
    features: {
        title: 'Game Features',
        tag: '// FEATURES',
        intro: '// SCREENSHOT PREVIEW',
        items: [
            {
                id: 'mechanics',
                index: '##FEATURE_01',
                imageSide: 'left',
                image: 'assets/images/screenshots/01.jpg',
                title: 'Orbital Mechanics',
                subtitle: 'KEPLER + RK4 ENGINE',
                description: 'Keplerian coasting, RK4 thrust integration, SOI gravity takeover — orbits measured with invisible precision. Miss a burn? Reload and try again!',
            },
            {
                id: 'vessel',
                index: '##FEATURE_02',
                imageSide: 'right',
                image: 'assets/images/screenshots/02.jpg',
                title: 'Vessel System',
                subtitle: 'MODULAR VESSEL SYSTEM',
                description: 'Start at the orbital dock, bolt modules onto your vessel, and watch the numbers tick up. It is your vessel, your rules — even if it blows up!',
            },
            {
                id: 'facility',
                index: '##FEATURE_03',
                imageSide: 'left',
                image: 'assets/images/screenshots/03.jpg',
                title: 'Facility System',
                subtitle: 'FACILITY NETWORK',
                description: 'Orbital docks, fuel depots, science labs — docking, refueling, refitting, building, researching, all in one flow. Build your logistics network around Kerbin, so every vessel coming home has a pad to dock at!',
            },
        ],
    },

    // —— Section 4: Open Beta Notices ——
    notices: {
        title: 'Open Beta Notices',
        tag: '// OPEN BETA NOTICE',
        // Section note (leave empty if not needed)
        note: '',
        // Notice items
        items: [
            'Orbit line rendering still has frame-of-reference issues that we cannot fully resolve for now',
            'The Kerbol system is still under construction — currently only Kerbol and Kerbin are available',
            'The vessel and facility systems are still incomplete; module types, build flow, and facility features are under continuous iteration',
            'There may still be unknown bugs',
            'Please keep your expectations in check and give us honest feedback. Every piece of feedback points the way for the next version. Thank you for your patience and support.',
        ],
    },

    // —— Section 5: Copyright Notice ——
    legal: {
        title: 'Copyright Notice',
        tag: '// LEGAL NOTICE',
        blocks: [
            {
                id: 'positioning',
                label: '// PROJECT POSITIONING',
                lines: [
                    'KSP 2D: Orbit Engineer is a fan-made (unofficial) 2D orbital engineering game, paying tribute to the classic Kerbal Space Program series.',
                    'This project is independently developed by the [Escape Velocity] team and has no affiliation with the original developers.',
                ],
            },
            {
                id: 'sources',
                label: '// RESOURCE SOURCE STATEMENT',
                lines: [
                    'Some art assets, audio assets, names, and gameplay inspiration in this game are derived from the Kerbal Space Program series.',
                    'The intellectual property of the above content belongs to its respective owners (Squad / Intercept Games / Private Division, etc.).',
                ],
            },
            {
                id: 'usage',
                label: '// COPYRIGHT & USAGE',
                lines: [
                    'This project is for learning, communication, and technical research only, and is not used for any commercial purposes.',
                    'We respect and support the copyright of the original works. Should the copyright holders have any concerns about the use of related resources, please reach out via the in-game feedback channel and we will address them promptly.',
                ],
            },
            {
                id: 'original',
                label: '// ORIGINAL CONTENT',
                lines: [
                    'Apart from the third-party resources mentioned above, the original code and original art of this project are reserved by the [Escape Velocity] team.',
                ],
            },
        ],
    },

    // —— Section 6: Contact ——
    contact: {
        title: 'Contact Us',
        tag: '// CONTACT',
        note: 'Found a bug, have an idea, or just want to talk about your next vessel design? Reach out any time.',
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

    // —— Footer ——
    footer: {
        brand: 'KSP2D:OE',
        copyright: '© 2026 KSP2D:OE — Kerbal Space Program 2D: Orbit Engineer',
        note: 'Fan / learning project. Not affiliated with Kerbal Space Program.',
    },
};
