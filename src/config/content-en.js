'use strict';

// ==========================================================================
// 英文站点文案（与 content-zh.js 结构完全对应，双语切换时按同一 schema 读取）
// 注意：内容对齐游戏本体 0.2.4 正式版；版本迭代后需同步更新
// ==========================================================================

export const CONTENT_EN = {
    // —— Top navigation ——
    nav: {
        links: [
            { id: 'hero', label: 'MISSION BRIEF' },
            { id: 'about', label: 'ABOUT' },
            { id: 'features', label: 'FEATURES' },
            { id: 'updates', label: 'UPDATES' },
            { id: 'notices', label: 'STATUS' },
            { id: 'legal', label: 'COPYRIGHT' },
            { id: 'contact', label: 'CONTACT' },
        ],
        langSwitchTo: '中文',
    },

    // —— Section 1: Hero ——
    // Before launch: countdown; after launch (now): status title + version line + CTA
    hero: {
        // Countdown copy (only visible during the pre-release phase)
        countdownLabel: 'COUNTDOWN TO OPEN BETA',
        units: {
            days: 'DAYS',
            hours: 'HOURS',
            minutes: 'MINS',
            seconds: 'SECS',
        },
        // Live-status copy
        launched: 'NOW LIVE',
        launchedSub: 'Orbit Engineer v0.2.4 is out — launch from Kerbin and push your supply network across the Kerbol system.',
        // CTA button（"PLAY NOW" links to site-config.js links.play）
        cta: {
            playLabel: 'PLAY NOW',
        },
    },

    // —— Section 2: About ——
    about: {
        title: 'About the Game',
        tag: '// ABOUT',
        body: 'Kerbal Space Program 2D: Orbit Engineer is a 2D space sandbox built around real orbital mechanics. '
            + 'Maneuver, rendezvous, and fly long-range missions — deploy facilities, haul supplies, '
            + 'and grow your logistics network across the planets and moons of the Kerbol system: from "getting a ship up" '
            + 'to running an interplanetary supply chain. '
            + 'Driven by Kepler analytic solutions and RK4 numerical integration, orbits are measured with invisible precision. '
            + 'Open beta 0.2.3 delivered the playable orbital framework; 0.2.4 adds the resource economy, cargo logistics, and facility management. '
            + 'Miss your burn? No worries — reload and try again!',
    },

    // —— Section 3: Features ——
    // First 3 items carry screenshots (alternating layout); omit image/imageSide for text-only cards
    features: {
        title: 'Game Features',
        tag: '// FEATURES',
        intro: '// FEATURE MATRIX',
        items: [
            {
                id: 'mechanics',
                index: '##FEATURE_01',
                imageSide: 'left',
                image: 'assets/images/screenshots/01.jpg',
                title: 'Orbital Mechanics',
                subtitle: 'KEPLER + RK4 ENGINE',
                description: 'Keplerian coasting, RK4 thrust integration, SOI gravity takeover, and orbit prediction — with auto-protection when time-warp crosses SOI boundaries, so you never blow past a maneuver node. Orbits measured with invisible precision.',
            },
            {
                id: 'vessel',
                index: '##FEATURE_02',
                imageSide: 'right',
                image: 'assets/images/screenshots/02.jpg',
                title: 'Vessel Assembly',
                subtitle: 'MODULAR VESSEL SYSTEM',
                description: 'Modular hulls, SAS attitude control, and split hydrogen/oxygen tanks — the in-flight HUD streams every tank level and total ΔV in real time. Run dry? Engines drop to engineOut — refuel and relight.',
            },
            {
                id: 'facility',
                index: '##FEATURE_03',
                imageSide: 'left',
                image: 'assets/images/screenshots/03.jpg',
                title: 'Facilities & Logistics',
                subtitle: 'FACILITY & LOGISTICS',
                description: 'Deploy command posts, supply depots, and docking hubs on stable orbits — each with its own storage. Haul cargo in freight modules, spend Material Kits on construction, and keep the supply chain open so every ship coming home has a pad to dock at.',
            },
            {
                id: 'economy',
                index: '##FEATURE_04',
                title: 'Resource Economy',
                subtitle: 'RESOURCE ECONOMY',
                description: 'Fuel is split by engine recipe (LH2:LOX = 1:8) and total mass shifts with propellant on board. Science points, Material Kits, and facility storage form a full economy — every gram counts, from launch to resupply.',
            },
            {
                id: 'modes',
                index: '##FEATURE_05',
                title: 'Sandbox & Career',
                subtitle: 'SANDBOX & CAREER',
                description: 'Sandbox: everything unlocked, budgets unlimited — pure sandbox. Career: unlock blueprints with science, and probe celestial bodies with resource scanners before you mine. Survey first, extract second.',
            },
            {
                id: 'interface',
                index: '##FEATURE_06',
                title: 'UI & Audio',
                subtitle: 'DOM UI & AUDIO',
                description: 'An all-DOM, KSP2-style panel system: draggable panels, a live HUD, and terminal-style menus. Body-type based flight music, SOI-switch sound cues, and a screen-space skybox.',
            },
        ],
    },

    // —— Section 4: Version Updates (timeline; maintain at summary level) ——
    updates: {
        title: 'Version Updates',
        tag: '// UPDATES',
        note: 'Follow the version timeline — how Orbit Engineer got to where it is today.',
        entries: [
            {
                // Persistent entry: current development cadence (no date)
                version: 'RECENT',
                title: 'Development Cadence',
                items: [
                    'After the 0.2.4 release, [Escape Velocity] is shifting to a cadence of smaller updates: bug fixes, polish, and minor features — not every update will be a major version.',
                    'Every update will still be reflected in the in-game bulletin and the version number. Development continues, and your feedback remains the most important input.',
                ],
            },
            {
                version: 'v0.2.4',
                title: 'Orbit Engineer 0.2.4',
                date: '2026-09',
                items: [
                    'In-flight HUD: fuel and total ΔV readouts in real time — the whole card turns red on engineOut',
                    'Draggable multi-panel system; toolbar panels can coexist as separate floating layers',
                    'Time-warp panel rebuilt + early-stop margin near apsides',
                    'Facility deployment cost rules fixed: sandbox mode is pure sandbox again',
                ],
            },
            {
                version: 'v0.2.4beta',
                title: '0.2.4 beta: The Gameplay Overhaul',
                date: '2026-08',
                items: [
                    'Resources: split LH2/LOX tanks + engine-recipe consumption + engineOut recovery',
                    'Cargo & facilities: orbital deployment, per-facility storage, supply chains, Material Kits',
                    'Sandbox / Career modes and active celestial scanning',
                    'All-DOM KSP2 panel system with full UI refactor',
                    'Galaxy configuration: multi-system selection and homeworld binding (experimental)',
                ],
            },
            {
                version: 'v0.2.3',
                title: 'First Public Test',
                date: '2026-08',
                items: [
                    'First fully playable framework: orbital mechanics, construction, SAS, time warp',
                    'All 16 Kerbolar bodies implemented: from Kerbol to Eeloo',
                    'Tracking station, system gallery, and audio system',
                ],
            },
        ],
    },

    // —— Section 5: Version Status (practical notes on the current version) ——
    notices: {
        title: 'Version Status',
        tag: '// VERSION STATUS',
        // Section note (leave empty if not needed)
        note: '',
        items: [
            'Latest release: v0.2.4. In development: v0.2.5-alpha. Details in "Version Updates" above.',
            'Known issue: with no orbital inclination in this 2D model, Jool and Eeloo orbits intersect geometrically. A 19-year simulation confirms the current initial phase keeps the minimum center distance at roughly 3× the sum of SOI radii — safe today, but any future phase change needs re-evaluation.',
            'Galaxy configuration is experimental: placeholder systems (Debdeb / Tuun) display data but cannot be selected; Testbolar uses the early prototype scale, so facility docking ranges look oversized by design.',
            'Browser saves and local saves are independent — progress does not carry over between them.',
            'Hit a problem? Reach us through the contact channels below — every report points the way for the next version.',
        ],
    },

    // —— Section 6: Copyright Notice ——
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

    // —— Section 7: Contact ——
    contact: {
        title: 'Contact Us',
        tag: '// CONTACT',
        note: 'Found a bug, have an idea, or just want to talk about your next vessel design? Reach out any time.',
        // Copy button labels
        copyLabel: 'COPY',
        copiedLabel: 'COPIED',
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

    // —— Footer ——
    footer: {
        brand: 'KSP2D:OE',
        copyright: '© 2026 KSP2D:OE — Kerbal Space Program 2D: Orbit Engineer',
        note: 'Fan / learning project. Not affiliated with Kerbal Space Program.',
    },
};
