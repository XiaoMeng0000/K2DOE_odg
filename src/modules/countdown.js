'use strict';

// ==========================================================================
// 公测倒计时模块
// 读系统时间实时计算距离开测的剩余时间，每秒刷新；
// 若当前时间已过公测时间，则倒计时归零冻结，不再走动，并切换"公测已开启"状态
// ==========================================================================

import { SITE_CONFIG } from '../config/site-config.js';
import { State } from '../core/state.js';
import { EventBus } from '../core/event-bus.js';
import { I18n } from '../core/i18n.js';

const DAY_MS = 86400000;
const HOUR_MS = 3600000;
const MINUTE_MS = 60000;

// 数字补零（始终保持两位）
function pad(value) {
    return String(value).padStart(2, '0');
}

/**
 * 初始化倒计时模块
 * 要求 DOM 中已存在 countdown-panel 及其各数值/标签元素
 */
export function initCountdown() {
    const target = SITE_CONFIG.launchDate.getTime();

    const els = {
        label: document.getElementById('countdown-label'),
        days: document.getElementById('cd-days'),
        hours: document.getElementById('cd-hours'),
        minutes: document.getElementById('cd-minutes'),
        seconds: document.getElementById('cd-seconds'),
        daysLabel: document.getElementById('cd-days-label'),
        hoursLabel: document.getElementById('cd-hours-label'),
        minutesLabel: document.getElementById('cd-minutes-label'),
        secondsLabel: document.getElementById('cd-seconds-label'),
        panel: document.getElementById('countdown-panel'),
        launched: document.getElementById('launched-msg'),
    };

    let timer = null;

    // 刷新各标签文案（跟随当前语言）
    function updateLabels() {
        const hero = I18n.getContent().hero;
        els.label.textContent = hero.countdownLabel;
        els.daysLabel.textContent = hero.units.days;
        els.hoursLabel.textContent = hero.units.hours;
        els.minutesLabel.textContent = hero.units.minutes;
        els.secondsLabel.textContent = hero.units.seconds;
        els.launched.querySelector('.launched-title').textContent = hero.launched;
        els.launched.querySelector('.launched-sub').textContent = hero.launchedSub;
    }

    // 归零冻结：停止计时器，切换"公测已开启"状态
    function freeze() {
        els.days.textContent = '00';
        els.hours.textContent = '00';
        els.minutes.textContent = '00';
        els.seconds.textContent = '00';
        els.panel.classList.add('is-launched');
        els.launched.hidden = false;
        State.data.launched = true;
        EventBus.emit('launched');
        clearInterval(timer);
        timer = null;
    }

    // 每秒刷新剩余时间
    function tick() {
        const diff = target - Date.now();
        if (diff <= 0) {
            freeze();
            return;
        }
        els.days.textContent = pad(Math.floor(diff / DAY_MS));
        els.hours.textContent = pad(Math.floor((diff % DAY_MS) / HOUR_MS));
        els.minutes.textContent = pad(Math.floor((diff % HOUR_MS) / MINUTE_MS));
        els.seconds.textContent = pad(Math.floor((diff % MINUTE_MS) / 1000));
    }

    // 语言切换时刷新标签
    EventBus.on('language-changed', updateLabels);

    updateLabels();

    if (target <= Date.now()) {
        // 已经过了公测时间：直接归零冻结
        freeze();
    } else {
        tick();
        timer = setInterval(tick, 1000);
    }
}
