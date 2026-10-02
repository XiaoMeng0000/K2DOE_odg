'use strict';

// ==========================================================================
// 国际化模块（i18n）
// 根据当前语言读取对应文案数据；切换语言时更新状态、持久化偏好并通过 EventBus 广播
// ==========================================================================

import { State, LANG_STORAGE_KEY } from './state.js';
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

        // 持久化语言偏好，使跳转页面后保持一致（存储不可用时忽略）
        try {
            window.localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (err) {
            // 隐私模式等场景下写入失败：不影响本次切换
        }

        EventBus.emit('language-changed', lang);
    },
};
