'use strict';

// ==========================================================================
// Hero 状态模块（原公测倒计时模块）
// 两种状态：
//   1. 未到发布时刻 —— 动态构建倒计时结构，每秒刷新剩余时间
//   2. 已过发布时刻 —— 不构建倒计时（DOM 中不留残留），显示正式运营状态卡
// 倒计时结构与状态卡文案都随语言切换刷新
// ==========================================================================

import { SITE_CONFIG } from '../config/site-config.js';
import { State } from '../core/state.js';
import { EventBus } from '../core/event-bus.js';
import { I18n } from '../core/i18n.js';

const DAY_MS = 86400000;
const HOUR_MS = 3600000;
const MINUTE_MS = 60000;

// 倒计时单位顺序（与 DOM 生成顺序、文案键名一致）
const UNITS = ['days', 'hours', 'minutes', 'seconds'];

// 数字补零（始终保持两位）
function pad(value) {
    return String(value).padStart(2, '0');
}

/**
 * 初始化 Hero 状态模块
 * 要求 DOM 中已存在 countdown-panel 与 launched-msg（后者由 sections.js 填充 CTA）
 */
export function initCountdown() {
    const target = SITE_CONFIG.launchDate.getTime();

    const panel = document.getElementById('countdown-panel');
    const launched = document.getElementById('launched-msg');
    const launchedTitle = launched.querySelector('.launched-title');
    const launchedSub = launched.querySelector('.launched-sub');

    // 倒计时引用（未到发布时刻时才构建；发布态为 null）
    let cd = null;
    let timer = null;

    // 按需构建倒计时结构（id 与样式类沿用原约定，便于未来复用）
    function buildCountdown() {
        const label = document.createElement('p');
        label.className = 'countdown-label';
        label.id = 'countdown-label';

        const grid = document.createElement('div');
        grid.className = 'countdown-grid';

        const refs = {};

        UNITS.forEach((unit, i) => {
            if (i > 0) {
                const sep = document.createElement('span');
                sep.className = 'countdown-sep';
                sep.textContent = ':';
                grid.appendChild(sep);
            }

            const box = document.createElement('div');
            box.className = 'countdown-unit';

            const value = document.createElement('span');
            value.className = 'countdown-value';
            value.id = 'cd-' + unit;
            value.textContent = '00';

            const unitLabel = document.createElement('span');
            unitLabel.className = 'countdown-unit-label';
            unitLabel.id = 'cd-' + unit + '-label';

            box.appendChild(value);
            box.appendChild(unitLabel);
            grid.appendChild(box);

            refs[unit] = { value, unitLabel };
        });

        // 插到状态卡之前，保持"倒计时在上、状态卡在下"的结构
        panel.insertBefore(grid, launched);
        panel.insertBefore(label, grid);

        return { label, refs };
    }

    // 刷新文案（跟随当前语言；倒计时不存在时跳过其标签）
    function updateLabels() {
        const hero = I18n.getContent().hero;

        if (cd) {
            cd.label.textContent = hero.countdownLabel;
            UNITS.forEach((unit) => {
                cd.refs[unit].unitLabel.textContent = hero.units[unit];
            });
        }

        launchedTitle.textContent = hero.launched;
        launchedSub.textContent = hero.launchedSub;
    }

    // 到达发布时刻：停止计时，切换正式运营状态卡
    function freeze() {
        if (cd) {
            UNITS.forEach((unit) => {
                cd.refs[unit].value.textContent = '00';
            });
        }
        panel.classList.add('is-launched');
        launched.hidden = false;
        State.data.launched = true;
        EventBus.emit('launched');
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // 每秒刷新剩余时间
    function tick() {
        const diff = target - Date.now();
        if (diff <= 0) {
            freeze();
            return;
        }
        cd.refs.days.value.textContent = pad(Math.floor(diff / DAY_MS));
        cd.refs.hours.value.textContent = pad(Math.floor((diff % DAY_MS) / HOUR_MS));
        cd.refs.minutes.value.textContent = pad(Math.floor((diff % HOUR_MS) / MINUTE_MS));
        cd.refs.seconds.value.textContent = pad(Math.floor((diff % MINUTE_MS) / 1000));
    }

    // 语言切换时刷新标签
    EventBus.on('language-changed', updateLabels);

    if (target <= Date.now()) {
        // 已过发布时刻：不构建倒计时，直接进入正式运营状态
        updateLabels();
        freeze();
    } else {
        // 未到发布时刻：构建倒计时并开始走动
        cd = buildCountdown();
        updateLabels();
        tick();
        timer = setInterval(tick, 1000);
    }
}
