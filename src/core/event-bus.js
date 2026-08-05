'use strict';

// ==========================================================================
// 事件总线（发布/订阅，对应游戏的 EventBus）
// 用于模块间解耦通信：模块只发事件、只收事件，互不直接引用
// ==========================================================================

const listeners = {};

export const EventBus = {
    /**
     * 订阅事件
     * @param {string} event 事件名
     * @param {Function} handler 处理函数
     */
    on(event, handler) {
        if (!listeners[event]) {
            listeners[event] = [];
        }
        listeners[event].push(handler);
    },

    /**
     * 取消订阅
     * @param {string} event 事件名
     * @param {Function} handler 处理函数
     */
    off(event, handler) {
        const arr = listeners[event];
        if (!arr) {
            return;
        }
        const index = arr.indexOf(handler);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    },

    /**
     * 发布事件
     * @param {string} event 事件名
     * @param {...*} args 传递给处理函数的参数
     */
    emit(event, ...args) {
        const arr = listeners[event];
        if (!arr) {
            return;
        }
        // 复制一份，避免处理函数中增删订阅导致遍历异常
        arr.slice().forEach((handler) => handler(...args));
    },
};
