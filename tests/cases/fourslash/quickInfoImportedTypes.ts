/// <reference path="fourslash.ts" />

// @Filename: quickInfoImportedTypes.ts
//// /** This is an interface */
//// export interface Foo {
////     a?: number;
//// }
//// /** One or two */
//// export type Bar = 1 | 2
//// /** This is a class */
//// export class Baz<T extends {}> {
////     public x: T = {} as T
//// }

// @Filename: two.ts
//// import { Foo, Bar, Baz } from './quickInfoImportedTypes';
//// let x: Foo/*1*/;
//// let y: Bar/*2*/<any>;
//// let z: Baz/*3*/;

verify.quickInfoAt("1", [
    "(alias) interface Foo",
    "import Foo",
].join("\n"), "This is an interface");

verify.quickInfoAt("2", [
    "(alias) type Bar = 1 | 2",
    "import Bar",
].join("\n"), "One or two");

verify.quickInfoAt("3", [
    "(alias) class Baz<T extends {}>",
    "import Baz",
].join("\n"), "This is a class");
