/// <reference path='fourslash.ts' />

// @Filename: foo.d.ts
//// declare class Foo {
////     static prop1(x: number): number;
////     static prop1(x: string): string;
////     static prop2(x: boolean): boolean;
//// }
//// export = Foo; /*2*/

// @Filename: app.ts
////import {/*1*/} from './foo';

goTo.marker('1');
verify.completionListContains('prop1');
verify.completionListContains('prop2');
verify.not.completionListContains('Foo');
verify.numberOfErrorsInCurrentFile(0);
goTo.marker('2');
verify.numberOfErrorsInCurrentFile(0);
