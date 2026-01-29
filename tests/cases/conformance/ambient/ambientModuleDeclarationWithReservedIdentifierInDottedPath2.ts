// @module: commonjs
// @target: es2015
// @declaration: true

declare namespace chrome.debugger {
    declare var tabId: number;
}

export const tabId = chrome.debugger.tabId;

declare namespace test.class {}

declare namespace debugger {} // still an error
