/// <reference path='fourslash.ts' />

// @Filename: /src/globals.d.ts
//// export {}; // Make this a module
//// declare global {
////     interface Disposable {
////         [Symbol.dispose](): void;
////     }
//// }

// @Filename: /src/test.ts
//// import { Service } from './lifecycle';
//// export class [|EditingService|] implements Service { }

// @Filename: /src/lifecycle.ts
//// export interface Disposable {
//// 	(): string;
//// }
//// export interface Service {
//// 	d: Disposable;
//// }

goTo.file('/src/test.ts');
verify.codeFix({
  description: "Implement interface 'Service'",
  newFileContent:
`import { Disposable, Service } from './lifecycle';
export class EditingService implements Service {
    d: Disposable;
}`,
});
