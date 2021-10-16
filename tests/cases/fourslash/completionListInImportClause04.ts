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

verify.completions({ marker: "1", exact: ["prototype", "prop1", "prop2", { name: "type", sortText: completion.SortText.GlobalsOrKeywords }] });
verify.noErrors();
goTo.marker('2');
verify.noErrors();
