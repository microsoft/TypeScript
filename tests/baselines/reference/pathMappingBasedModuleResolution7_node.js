//// [tests/cases/compiler/pathMappingBasedModuleResolution7_node.ts] ////

//// [file2.ts]
import {a} from "module1";
import {b} from "templates/module2";
import {x as c} from "../file3";
export let x = a + b + c;

//// [index.d.ts]
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

//// [index.d.ts]
export let x: number;


//// [module2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const module1_1 = require("module1");
const module2_1 = require("templates/module2");
const file3_1 = require("../file3");
exports.x = module1_1.a + module2_1.b + file3_1.x;
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file2_1 = require("./project/file2");
const module3_1 = require("module3");
use(file2_1.x.toFixed());
use(module3_1.y.toFixed());
