/// <reference path='fourslash.ts' />

// @Filename: foo.d.ts
//// declare class Foo {
////     static prop1(x: number): number;
////     static prop1(x: string): string;
////     static prop2(x: boolean): boolean;
////     static ['hello world']: boolean;
//// }
//// export = Foo; /*2*/

// @Filename: app.ts
////import {/*1*/} from './foo';

// TODO: expected to have { name: "hello world", insertText: "'hello world' as ${1:item}" },
// but Foo does not have a ValueModule flag even it is used as one.
verify.completions({ marker: "1", unsorted: ["prototype", "prop1", "prop2", { name: "type", sortText: completion.SortText.GlobalsOrKeywords }] });
verify.noErrors();
goTo.marker('2');
verify.noErrors();
