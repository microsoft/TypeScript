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
/** @jsx h */
var renderer_1 = require("./renderer");
exports.prerendered = renderer_1.dom("h", null);
//// [othernoalias.js]
"use strict";
exports.__esModule = true;
/** @jsx otherdom */
var renderer_1 = require("./renderer");
exports.prerendered2 = renderer_1.otherdom("h", null);
//// [reacty.js]
"use strict";
exports.__esModule = true;
var renderer_1 = require("./renderer");
exports.prerendered3 = renderer_1["default"].createElement("h", null);
//// [index.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
/** @jsx dom */
var renderer_1 = require("./renderer");
renderer_1.dom("h", null);
__export(require("./other"));
__export(require("./othernoalias"));
__export(require("./reacty"));
