//// [tests/cases/compiler/namespaceMergedWithClassDefaultExport.ts] ////

//// [package.json]
{
  "name": "some-lib",
  "types": "./types/index.d.ts"
}

//// [index.d.ts]
declare module 'some-lib' {
  export class Cls { constructor(arg: number); }
  export default Cls;

  namespace Cls {
    export function defaults(arg: number): void;
  }
}

//// [main.ts]
import Cls from "some-lib";
new Cls(10);


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var some_lib_1 = require("some-lib");
new some_lib_1.default(10);
