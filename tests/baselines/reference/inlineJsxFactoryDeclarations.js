//// [tests/cases/conformance/jsx/inline/inlineJsxFactoryDeclarations.tsx] ////

//// [renderer.d.ts]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function dom(): void;
export function otherdom(): void;
export function createElement(): void;
export { dom as default };
//// [otherreacty.tsx]
/** @jsx React.createElement */
import * as React from "./renderer";
<h></h>
//// [other.tsx]
/** @jsx h */
import { dom as h } from "./renderer"
export const prerendered = <h></h>;
//// [othernoalias.tsx]
/** @jsx otherdom */
import { otherdom } from "./renderer"
export const prerendered2 = <h></h>;
//// [reacty.tsx]
import React from "./renderer"
export const prerendered3 = <h></h>;

//// [index.tsx]
/** @jsx dom */
import { dom } from "./renderer"
<h></h>
export * from "./other";
export * from "./othernoalias";
export * from "./reacty";


//// [otherreacty.js]
"use strict";
exports.__esModule = true;
/** @jsx React.createElement */
var React = require("./renderer");
React.createElement("h", null);
//// [other.js]
"use strict";
exports.__esModule = true;
exports.prerendered = void 0;
/** @jsx h */
var renderer_1 = require("./renderer");
exports.prerendered = (0, renderer_1.dom)("h", null);
//// [othernoalias.js]
"use strict";
exports.__esModule = true;
exports.prerendered2 = void 0;
/** @jsx otherdom */
var renderer_1 = require("./renderer");
exports.prerendered2 = (0, renderer_1.otherdom)("h", null);
//// [reacty.js]
"use strict";
exports.__esModule = true;
exports.prerendered3 = void 0;
var renderer_1 = require("./renderer");
exports.prerendered3 = renderer_1["default"].createElement("h", null);
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
/** @jsx dom */
var renderer_1 = require("./renderer");
(0, renderer_1.dom)("h", null);
__exportStar(require("./other"), exports);
__exportStar(require("./othernoalias"), exports);
__exportStar(require("./reacty"), exports);
