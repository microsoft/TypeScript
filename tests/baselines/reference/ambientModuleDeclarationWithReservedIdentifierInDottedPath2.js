//// [tests/cases/conformance/ambient/ambientModuleDeclarationWithReservedIdentifierInDottedPath2.ts] ////

//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath2.ts]
declare namespace chrome.debugger {
    declare var tabId: number;
}

export const tabId = chrome.debugger.tabId;

declare namespace test.class {}

declare namespace debugger {} // still an error


//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath2.js]
export const tabId = chrome.debugger.tabId;
declare;
namespace;
debugger;
{ } // still an error


//// [ambientModuleDeclarationWithReservedIdentifierInDottedPath2.d.ts]
export declare const tabId: number;
