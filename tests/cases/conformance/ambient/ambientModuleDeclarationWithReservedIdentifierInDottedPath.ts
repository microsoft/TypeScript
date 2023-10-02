// @declaration: true

// https://github.com/microsoft/TypeScript/issues/7840

declare module chrome.debugger {
    declare var tabId: number;
}

export const tabId = chrome.debugger.tabId;

declare module test.class {}

declare module debugger {} // still an error
