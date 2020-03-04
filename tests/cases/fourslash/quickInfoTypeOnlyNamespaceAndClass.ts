/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export namespace ns {
////  export class Box<T> {}
////}

// @Filename: /b.ts
////import type { ns } from './a';
////let x: /*1*/ns./*2*/Box<string>;

verify.quickInfoAt("1", "(alias) namespace ns\nimport ns");
verify.quickInfoAt("2", "class ns.Box<T>");
