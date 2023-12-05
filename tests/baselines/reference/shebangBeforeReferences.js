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
#!/usr/bin/env node
"use strict";
/// <reference path="f.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("test");
use(test_1.x);
