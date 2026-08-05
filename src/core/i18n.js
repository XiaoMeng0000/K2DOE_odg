'use strict';

// ==========================================================================
// 国际化模块（i18n）
// 根据当前语言读取对应文案数据；切换语言时更新状态并通过 EventBus 广播
// ==========================================================================

import { State } from './state.js';
import { EventBus } from './event-bus.js';
import { CONTENT_ZH } from '../config/content-zh.js';
import { CONTENT_EN } from '../config/content-en.js';

// 语言 -> 文案数据的映射表
const CONTENT_MAP = {
    zh: CONTENT_ZH,
    en: CONTENT_EN,
};

export const I18n = {
    /**
     * 获取当前语言的文案对象
     * @returns {object} 文案数据（未知语言时回退中文）
     */
    getContent() {
        return CONTENT_MAP[State.data.language] || CONTENT_ZH;
    },

    /**
     * 切换语言并广播变更事件
     * @param {string} lang 'zh' | 'en'
     */
    setLanguage(lang) {
        if (!CONTENT_MAP[lang]) {
            return;
        }
        if (State.data.language === lang) {
            return;
        }
        State.data.language = lang;
        EventBus.emit('language-changed', lang);
    },
};
