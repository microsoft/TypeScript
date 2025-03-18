//// [tests/cases/compiler/pathMappingBasedModuleResolution7_classic.ts] ////

//// [file2.ts]
import {a} from "module1";
import {b} from "templates/module2";
import {x as c} from "../file3";
export let x = a + b + c;

//// [module1.d.ts]
export let a: number

//// [module2.ts]
export let b: number;

//// [module3.d.ts]
export let y: number;


//// [file1.ts]
import {x} from "./project/file2";
import {y} from "module3";

declare function use(x: string);
use(x.toFixed());
use(y.toFixed());

//// [file3.d.ts]
export let x: number;


//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file2_1 = require("./project/file2");
const module3_1 = require("module3");
use(file2_1.x.toFixed());
use(module3_1.y.toFixed());
