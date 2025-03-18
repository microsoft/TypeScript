//// [tests/cases/compiler/pathMappingBasedModuleResolution6_node.ts] ////

//// [file3.ts]
export {x} from "../file2";
//// [file1.ts]
import {x} from "./project/file3";
declare function use(x: string);
use(x.toFixed());

//// [index.d.ts]
export let x: number;


//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file3_1 = require("./project/file3");
use(file3_1.x.toFixed());
