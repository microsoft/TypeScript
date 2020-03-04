//// [tests/cases/compiler/nestedGenericConditionalTypeWithGenericImportType.ts] ////

//// [name.ts]
// #31824

export type Name<T> = any;

//// [index.ts]
type T<X> = any extends ((any extends any ? any : string) extends any ? import("./name").Name<X> : any)
  ? any
  : any;


//// [name.js]
"use strict";
// #31824
exports.__esModule = true;
//// [index.js]
