//// [tests/cases/compiler/nestedGenericConditionalTypeWithGenericImportType.ts] ////

//// [name.ts]
export type Name<T> = any;

//// [index.ts]
type T<X> = any extends ((any extends any ? any : string) extends any ? import("./name").Name<X> : any)
  ? any
  : any;


//// [name.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
