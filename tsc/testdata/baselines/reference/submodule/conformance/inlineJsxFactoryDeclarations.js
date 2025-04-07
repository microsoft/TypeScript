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
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx React.createElement */
const React = require("./renderer");
<h></h>;
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prerendered = void 0;
/** @jsx h */
const renderer_1 = require("./renderer");
exports.prerendered = <renderer_1.dom></h>;
//// [othernoalias.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prerendered2 = void 0;
/** @jsx otherdom */
const renderer_1 = require("./renderer");
exports.prerendered2 = <h></h>;
//// [reacty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prerendered3 = void 0;
const renderer_1 = require("./renderer");
exports.prerendered3 = <h></h>;
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx dom */
const renderer_1 = require("./renderer");
<h></h>;
__exportStar(require("./other"), exports);
__exportStar(require("./othernoalias"), exports);
__exportStar(require("./reacty"), exports);
