'use strict';

// ==========================================================================
// 英文站点文案（与 content-zh.js 结构完全对应，双语切换时按同一 schema 读取）
// 三个页面（index / news / guide）共用本文件
// ==========================================================================

export const CONTENT_EN = {
    // —— Site navigation (cross-page, shared by all three pages) ——
    nav: {
        links: [
            { id: 'home', label: 'HOME', href: 'index.html' },
            { id: 'features', label: 'FEATURES', href: 'index.html#features' },
            { id: 'news', label: 'UPDATES', href: 'index.html#updates' },
            { id: 'guide', label: 'GUIDE', href: 'index.html#guide' },
            { id: 'contact', label: 'CONTACT', href: 'index.html#contact' },
        ],
        langSwitchTo: '中文',
    },

    // —— Home · Hero ——
    // Before launch: countdown; after launch (now): status title + version line + CTA
    hero: {
        countdownLabel: 'COUNTDOWN TO OPEN BETA',
        units: {
            days: 'DAYS',
            hours: 'HOURS',
            minutes: 'MINS',
            seconds: 'SECS',
        },
        launched: 'NOW LIVE',
        launchedSub: 'Orbit Engineer v0.2.6 is out — now you can draw a whole mission plan onto the orbit itself.',
        // Technical spec strip (mono data line under the hero)
        specs: [
            '16 CELESTIAL BODIES',
            'KEPLER + RK4 ENGINES',
            'UP TO 10,000,000× TIME WARP',
            'ZERO-DEPENDENCY BROWSER BUILD',
        ],
        cta: {
            playLabel: 'PLAY NOW',
        },
    },

    // —— Home · About ——
    about: {
        title: 'About the Game',
        tag: 'ABOUT',
        body: 'Kerbal Space Program 2D: Orbit Engineer is a 2D space sandbox built around real orbital mechanics. '
            + 'Maneuver, rendezvous, and fly long-range missions — deploy facilities, haul supplies, '
            + 'and grow your logistics network across the planets and moons of the Kerbol system: from "getting a ship up" '
            + 'to running an interplanetary supply chain. '
            + 'Orbits are driven by Kepler analytic solutions and RK4 numerical integration, so a burn can be planned to the metre per second. '
            + 'Open beta 0.2.3 delivered the orbital framework; 0.2.4 added the resource economy and facility management; '
            + '0.2.5 and 0.2.6 made maneuver planning real — drop a node, drag a handle, chain a whole mission plan. '
            + 'Miss your burn? No worries — reload and try again!',
    },

    // —— Home · Features ——
    // Items with an image render as alternating rows; items without render as text cards
    features: {
        title: 'Game Features',
        tag: 'FEATURES',
        intro: 'FEATURE MATRIX',
        items: [
            {
                id: 'mechanics',
                index: '01',
                imageSide: 'left',
                image: 'assets/images/screenshots/01.jpg',
                title: 'Orbital Mechanics',
                subtitle: 'KEPLER + RK4 ENGINE',
                description: 'Keplerian coasting, RK4 thrust integration, SOI gravity takeover, and orbit prediction — with auto-protection when time-warp crosses SOI boundaries, so you never blow past a maneuver point. Orbits measured with invisible precision.',
            },
            {
                id: 'vessel',
                index: '02',
                imageSide: 'right',
                image: 'assets/images/screenshots/02.jpg',
                title: 'Vessel Assembly',
                subtitle: 'MODULAR VESSEL SYSTEM',
                description: 'Modular hulls, SAS attitude control, and split propellant tanks — the in-flight HUD streams every tank level and total ΔV in real time. Run dry? Engines drop to engineOut — refuel and relight.',
            },
            {
                id: 'facility',
                index: '03',
                imageSide: 'left',
                image: 'assets/images/screenshots/03.jpg',
                title: 'Facilities & Logistics',
                subtitle: 'FACILITY & LOGISTICS',
                description: 'Deploy orbital docks, supply depots, and science labs on stable orbits — each with its own storage. Haul cargo in freight modules, spend Material Kits on construction, and keep the supply chain open so every ship coming home has a pad to dock at.',
            },
            {
                id: 'maneuver',
                index: '04',
                title: 'Maneuver Planning',
                subtitle: 'MANEUVER PLANNING',
                description: 'Click the orbit to drop a node, drag the four direction handles to inject Δv, and watch the prediction redraw — the red arc is the burn, the pink line is the resulting orbit. Press V for the orbital maneuver view, and chain multiple nodes in series like a mission checklist.',
            },
            {
                id: 'economy',
                index: '05',
                title: 'Resource Economy',
                subtitle: 'RESOURCE ECONOMY',
                description: 'Tiered propellants (LH2 / LOX / methane / monopropellant / xenon / helium-3 / antimatter), raw materials (water ice / metal ore / rare earths / fissiles), Material Kits and science points — mining, cargo, scanning and facility storage form one production chain. Every gram counts.',
            },
            {
                id: 'modes',
                index: '06',
                title: 'Sandbox & Career',
                subtitle: 'SANDBOX & CAREER',
                description: 'Sandbox: everything unlocked, budgets unlimited. Career: unlock blueprints with science, and probe celestial bodies with resource scanners before you mine. You also choose which star systems to load.',
            },
            {
                id: 'interface',
                index: '07',
                title: 'UI & Saves',
                subtitle: 'DOM UI & SAVES',
                description: 'An all-DOM, KSP2-style panel system: draggable panels, a live flight HUD, and terminal-style menus. Campaign and checkpoint saves, plus world import/export — pack up your star system and take it with you.',
            },
        ],
    },

    // —— Version Updates (home shows the first previewCount entries; news.html shows all) ——
    updates: {
        title: 'Version Updates',
        tag: 'UPDATES',
        note: 'Follow the version timeline — how Orbit Engineer got to where it is today.',
        previewCount: 3,
        moreLabel: 'VIEW FULL UPDATE LOG',
        entries: [
            {
                version: 'RECENT',
                title: 'Current Cadence: Small Steps',
                items: [
                    'Since 0.2.4, [Escape Velocity] has been shipping smaller updates: fixes, polish, and focused features — 0.2.5 and 0.2.6 both follow that cadence.',
                    '0.3.0 is already in development: configuration refactor and time-warp mechanics first, paving the way for larger content and visual upgrades.',
                ],
            },
            {
                version: 'v0.2.6',
                title: 'Maneuver Nodes: Serial Planning',
                date: '2026-09-18',
                items: [
                    'A vessel can now hold multiple maneuver nodes; new nodes attach to the end of the plan, forming a serial chain',
                    'Selected node and execution target are separated: cycle with ◀ i/N ▶, while SAS and the warp button always point at the next incomplete node',
                    'Edit an earlier node\'s Δv or epoch and all following nodes re-fit automatically, keeping direction semantics and mass snapshots consistent',
                    'The in-game bulletin moved up to a first-level main-menu entry',
                ],
            },
            {
                version: 'v0.2.5',
                title: 'Maneuver Nodes & Orbital Maneuver View',
                date: '2026-09-12',
                items: [
                    'Maneuver nodes: drop a node on the orbit, drag handles to inject Δv, preview the burn arc and resulting orbit, with a fuel-exhaustion marker',
                    'Orbital maneuver view (press V): a zoomed inset plus a node editor, with create-in-place and whole-period shifting to hunt transfer windows',
                    'SAS gains a "node" pointing mode — align once and burn as planned',
                    'World import/export: saves can be exported to a file for another machine or another player',
                    'High-DPI display fixes, save-reliability hardening, and a rendering/UI performance pass',
                ],
            },
            {
                version: 'v0.2.4',
                title: 'Resource Economy & Facility Management',
                date: '2026-09',
                items: [
                    'In-flight HUD: fuel and total ΔV readouts in real time — the whole card turns red on engineOut',
                    'Draggable multi-panel system; toolbar panels coexist as separate floating layers',
                    'Time-warp panel rebuilt + early-stop margin near apsides',
                    'Facility deployment cost rules fixed: sandbox mode is pure sandbox again',
                ],
            },
            {
                version: 'v0.2.4beta',
                title: 'The Gameplay Overhaul',
                date: '2026-08',
                items: [
                    'Resources: split propellant tanks + engine-recipe consumption + engineOut recovery',
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

    // —— Version Status (news.html) ——
    notices: {
        title: 'Version Status',
        tag: 'VERSION STATUS',
        note: '',
        items: [
            'Latest release: v0.2.6. In development: v0.3.0-alpha (pre-release). Full changelog in the timeline above.',
            'Maneuver-node progress tracks the currently controlled vessel: node data persists in the save when you switch ships, but progress only advances on the controlled one.',
            'Multi-node plans are re-computed across frames: with a very long chain, the newest node near the tail may take a frame or two to show its full prediction. This is expected.',
            'Known issue: with no orbital inclination in this 2D model, Jool and Eeloo orbits intersect geometrically. A 19-year simulation confirms the current initial phase keeps the minimum center distance at roughly 3× the sum of SOI radii — safe today, but any future phase change needs re-evaluation.',
            'Galaxy configuration is experimental: placeholder systems (Debdeb / Tuun) display data but cannot be selected; Testbolar uses the early prototype scale, so facility docking ranges look oversized by design.',
            'Browser saves and local saves are independent — progress does not carry over between them.',
            'Hit a problem? Reach us through the contact channels — every report points the way for the next version.',
        ],
    },

    // —— Home · Copyright (collapsed by default) ——
    legal: {
        title: 'Copyright Notice',
        tag: 'LEGAL NOTICE',
        foldLabel: 'Copyright & Project Notice',
        foldHint: 'Fan project · non-commercial · click to expand',
        blocks: [
            {
                id: 'positioning',
                label: 'PROJECT POSITIONING',
                lines: [
                    'KSP 2D: Orbit Engineer is a fan-made (unofficial) 2D orbital engineering game, paying tribute to the classic Kerbal Space Program series.',
                    'This project is independently developed by the [Escape Velocity] team and has no affiliation with the original developers.',
                ],
            },
            {
                id: 'sources',
                label: 'RESOURCE SOURCE STATEMENT',
                lines: [
                    'Some art assets, audio assets, names, and gameplay inspiration in this game are derived from the Kerbal Space Program series.',
                    'The intellectual property of the above content belongs to its respective owners (Squad / Intercept Games / Private Division, etc.).',
                ],
            },
            {
                id: 'usage',
                label: 'COPYRIGHT & USAGE',
                lines: [
                    'This project is for learning, communication, and technical research only, and is not used for any commercial purposes.',
                    'We respect and support the copyright of the original works. Should the copyright holders have any concerns about the use of related resources, please reach out through our feedback channels and we will address them promptly.',
                ],
            },
            {
                id: 'original',
                label: 'ORIGINAL CONTENT',
                lines: [
                    'Apart from the third-party resources mentioned above, the original code and original art of this project are reserved by the [Escape Velocity] team.',
                ],
            },
        ],
    },

    // —— Contact (home) ——
    contact: {
        title: 'Contact Us',
        tag: 'CONTACT',
        note: 'Found a bug, have an idea, or just want to talk about your next vessel design? Reach out any time.',
        copyLabel: 'COPY',
        copiedLabel: 'COPIED',
        channels: [
            {
                id: 'qqgroup',
                badge: '群',
                label: 'QQ GROUP',
                hint: 'COMMUNITY',
                value: '1098073419',
                url: 'https://qm.qq.com/q/1098073419',
            },
            {
                id: 'qq',
                badge: 'QQ',
                label: 'DEVELOPER QQ',
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

    // —— Getting Started (guide.html) ——
    guide: {
        title: 'Getting Started',
        tag: 'GETTING STARTED',
        intro: 'Three steps to your first maneuver. The in-game encyclopedia covers the rest.',
        stepsTitle: 'Start Playing',
        steps: [
            {
                index: '01',
                title: 'Open the Game',
                body: 'Play right in your browser — nothing to install. You can also clone the repository and run it locally (node server.js, then open localhost:3000). The first launch loads images, audio and fonts, so give it a moment.',
            },
            {
                index: '02',
                title: 'Start a Campaign',
                body: 'Create a campaign from the main menu: Sandbox (unlimited resources — best for learning the controls) or Career (strict economy, blueprints unlocked with science), and pick which star systems to load.',
            },
            {
                index: '03',
                title: 'Reach Orbit',
                body: 'Assemble and build a vessel at the orbital dock. After launch, press G to point prograde, raise the throttle with Shift or Z, push your apoapsis to the target altitude, coast, then burn again at apoapsis to circularize.',
            },
            {
                index: '04',
                title: 'Plan a Maneuver',
                body: 'Click the orbit line to create a maneuver node, drag handles to inject Δv, and watch the burn arc and new orbit draw themselves. Press V for the maneuver view to see the whole picture and hunt transfer windows; switch SAS to "node", align, and burn.',
            },
        ],
        keysTitle: 'Key Bindings',
        keysNote: 'The full illustrated reference lives in the in-game encyclopedia (Basics / Orbital Flight).',
        keys: [
            { key: 'A / D', desc: 'Rotate vessel left / right' },
            { key: 'Shift / Ctrl', desc: 'Increase / decrease throttle' },
            { key: 'Z / X', desc: 'Full throttle / cut throttle' },
            { key: 'T', desc: 'Toggle SAS attitude hold' },
            { key: 'G', desc: 'Cycle SAS pointing (prograde / retrograde / radial in / radial out)' },
            { key: ', / .', desc: 'Lower / raise time-warp level (0x = paused)' },
            { key: '\\', desc: 'Reset time warp to 1x' },
            { key: 'Alt + , / .', desc: 'Fine time control between 1x and 4x' },
            { key: 'V', desc: 'Toggle orbital maneuver view' },
            { key: 'B', desc: 'Open facility panel when near a facility' },
            { key: 'Mouse wheel', desc: 'Zoom the view' },
            { key: 'Click body / facility', desc: 'Focus the camera there' },
            { key: 'Esc', desc: 'ESC menu (settings, saves, back to main menu)' },
        ],
        faqTitle: 'FAQ',
        faq: [
            {
                q: 'Do I need to download anything?',
                a: 'No. Hit "PLAY NOW" and the game runs in your browser. To play offline, clone the repository and run it locally with node server.js.',
            },
            {
                q: 'Where are my saves? Do browser and local saves share progress?',
                a: 'Saves live in your browser storage, and the two are completely independent. Since 0.2.5 you can use "Export World / Import World" to move or share a save as a file.',
            },
            {
                q: 'Which browsers are supported?',
                a: 'Modern desktop browsers — Chrome, Edge, Firefox — with ES Module and Web Audio support. A reasonably large desktop window is recommended.',
            },
            {
                q: 'Why does my ship ignore input during time warp?',
                a: 'By design: control input is ignored while time is accelerated. Drop back to 1x (press "\\" to reset) before steering or burning.',
            },
            {
                q: 'It runs slowly. What can I do?',
                a: 'High warp factors, many vessels and many facilities all cost performance. Close panels you are not using, lower the warp level, or zoom in to reduce what has to be drawn.',
            },
        ],
        moreLabel: 'FULL GUIDE — KEY BINDINGS & FAQ',
        backLabel: '← Back to home',
    },

    // —— Updates page (news.html) ——
    newsPage: {
        intro: 'The full version timeline, maintained in step with the in-game bulletin. Every bullet is something that actually shipped.',
        backLabel: '← Back to home',
    },

    // —— Footer ——
    footer: {
        brand: 'KSP2D:OE',
        copyright: '© 2026 KSP2D:OE — Kerbal Space Program 2D: Orbit Engineer',
        note: 'Fan / learning project. Not affiliated with Kerbal Space Program.',
    },
};
