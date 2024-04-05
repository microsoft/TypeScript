//// [tests/cases/compiler/ambientNameRestrictions.ts] ////

//// [ambientNameRestrictions.ts]
export declare namespace Foo {
  export var static: any;
}


//// [ambientNameRestrictions.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
