//// [tests/cases/conformance/ambient/ambientModuleDeclarationWithReservedIdentifierInDottedPath.ts] ////

//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath.ts]
// https://github.com/microsoft/TypeScript/issues/7840

declare module chrome.debugger {
    declare var tabId: number;
}

export const tabId = chrome.debugger.tabId;

declare module test.class {}

declare module debugger {} // still an error


//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath.js]
// https://github.com/microsoft/TypeScript/issues/7840
export const tabId = chrome.debugger.tabId;
declare;
module;
debugger;
{ } // still an error


//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath.d.ts]
export declare const tabId: number;
