//// [tests/cases/compiler/shebangBeforeReferences.ts] ////

//// [f.d.ts]
declare module "test" {
    let x: number;
}

//// [f.ts]
#!/usr/bin/env node

/// <reference path="f.d.ts"/>

declare function use(f: number): void;
import {x} from "test";
use(x);

//// [f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="f.d.ts"/>
const test_1 = require("test");
use(test_1.x);
