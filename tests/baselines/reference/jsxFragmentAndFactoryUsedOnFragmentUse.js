//// [tests/cases/compiler/jsxFragmentAndFactoryUsedOnFragmentUse.tsx] ////

//// [index.tsx]
import {element, fragment} from "./jsx";

export const a = <>fragment text</>

//// [jsx.ts]
export function element() {}

export function fragment() {}

//// [jsx.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = element;
exports.fragment = fragment;
function element() { }
function fragment() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var jsx_1 = require("./jsx");
exports.a = (0, jsx_1.element)(jsx_1.fragment, null, "fragment text");
