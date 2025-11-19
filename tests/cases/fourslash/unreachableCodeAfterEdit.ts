/// <reference path="fourslash.ts" />

// @allowUnreachableCode: false
// @lib: es2015

// @Filename: /base/browser/browser.ts
//// export const isStandalone = true;

// @Filename: /base/browser/dom.ts
//// export function addDisposableListener() {}

// @Filename: /base/browser/window.ts
//// export const mainWindow = {} as Window;

// @Filename: /workbench.ts
//// /*before*/import { isStandalone } from './base/browser/browser';
//// import { addDisposableListener } from './base/browser/dom';
//// import { mainWindow } from './base/browser/window';
//// 
//// interface ISecretStorageCrypto {
////     seal(data: string): Promise<string>;
////     unseal(data: string): Promise<string>;
//// }
//// 
//// export class TransparentCrypto implements ISecretStorageCrypto {
////     async seal(data: string): Promise<string> {
////         return data;
////     }
////     async unseal(data: string): Promise<string> {
////         return data;
////     }
//// }

// Initially, there should be no errors
verify.numberOfErrorsInCurrentFile(0);

// Add a throw statement ABOVE the imports
goTo.marker("before");
edit.insert("throw new Error('foo');\n");

// Now there should be unreachable code errors
verify.numberOfErrorsInCurrentFile(1);

// Remove the throw statement
goTo.marker("before");
edit.deleteAtCaret("throw new Error('foo');\n".length);

// After removing the throw, there should be no errors again
// BUG: This will fail because reportedUnreachableNodes is not cleared properly
verify.numberOfErrorsInCurrentFile(0);
