//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalTSModule.ts] ////

//// [index.ios.ts]
export function ios() {}
//// [index.ts]
export function base() {}
//// [test.ts]
import { ios } from "some-library";


//// [/bin/test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
