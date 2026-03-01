//// [tests/cases/conformance/ambient/ambientShorthand_merging.ts] ////

//// [declarations1.d.ts]
declare module "foo";

//// [declarations2.d.ts]
declare module "foo" {
    export const bar: number;
}

//// [user.ts]
///<reference path="declarations1.d.ts" />
///<reference path="declarations1.d.ts" />
import foo, {bar} from "foo";


//// [user.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
