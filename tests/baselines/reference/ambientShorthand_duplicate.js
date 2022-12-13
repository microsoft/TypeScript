//// [tests/cases/conformance/ambient/ambientShorthand_duplicate.ts] ////

//// [declarations1.d.ts]
declare module "foo";

//// [declarations2.d.ts]
declare module "foo";

//// [user.ts]
///<reference path="declarations1.d.ts" />
///<reference path="declarations1.d.ts" />
import foo from "foo";


//// [user.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
