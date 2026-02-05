//// [tests/cases/compiler/commonSourceDirectory.ts] ////

//// [index.ts]
export const x = 0;

//// [bar.d.ts]
declare module "bar" {
    export const y = 0;
}

//// [index.ts]
/// <reference path="../types/bar.d.ts" preserve="true" />
import { x } from "foo";
import { y } from "bar";
x + y;


//// [/app/bin/index.js]
/// <reference path="../types/bar.d.ts" preserve="true" />
import { x } from "foo";
import { y } from "bar";
x + y;
//# sourceMappingURL=../myMapRoot/index.js.map

//// [/app/bin/index.d.ts]
/// <reference path="../../types/bar.d.ts" preserve="true" />
export {};
