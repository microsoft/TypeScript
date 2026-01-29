//// [tests/cases/conformance/ambient/ambientModuleDeclarationWithReservedIdentifierInDottedPath.ts] ////

//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath.ts]
// https://github.com/microsoft/TypeScript/issues/7840

declare namespace chrome.debugger {
    declare var tabId: number;
}

export const tabId = chrome.debugger.tabId;

declare namespace test.class {}

declare namespace debugger {} // still an error


//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath.js]
// https://github.com/microsoft/TypeScript/issues/7840
export const tabId = chrome.debugger.tabId;
declare;
namespace;
debugger;
{ } // still an error


//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath.d.ts]
export declare const tabId: number;
