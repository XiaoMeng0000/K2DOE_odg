'use strict';

// ==========================================================================
// 全局状态单例（对应游戏的 GameState）
// 所有模块共享的运行期状态都集中在这里，避免散落各处
// ==========================================================================

// 语言偏好的本地存储键（跨页、跨会话记忆）
export const LANG_STORAGE_KEY = 'ksp2doe.lang';

// 读取本地存储中的语言偏好（存储不可用时回退中文）
function readStoredLanguage() {
    try {
        const v = window.localStorage.getItem(LANG_STORAGE_KEY);
        return v === 'en' || v === 'zh' ? v : 'zh';
    } catch (err) {
        return 'zh';
    }
}

export const State = {
    data: {
        // 当前语言：'zh' | 'en'（跨页保持）
        language: readStoredLanguage(),

        // 是否已过公测时间（倒计时冻结标志）
        launched: false,
    },
};
