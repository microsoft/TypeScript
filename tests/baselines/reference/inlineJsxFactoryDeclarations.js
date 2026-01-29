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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx React.createElement */
const React = __importStar(require("./renderer"));
React.createElement("h", null);
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prerendered = void 0;
/** @jsx h */
const renderer_1 = require("./renderer");
exports.prerendered = (0, renderer_1.dom)("h", null);
//// [othernoalias.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prerendered2 = void 0;
/** @jsx otherdom */
const renderer_1 = require("./renderer");
exports.prerendered2 = (0, renderer_1.otherdom)("h", null);
//// [reacty.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prerendered3 = void 0;
const renderer_1 = __importDefault(require("./renderer"));
exports.prerendered3 = renderer_1.default.createElement("h", null);
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
(0, renderer_1.dom)("h", null);
__exportStar(require("./other"), exports);
__exportStar(require("./othernoalias"), exports);
__exportStar(require("./reacty"), exports);
