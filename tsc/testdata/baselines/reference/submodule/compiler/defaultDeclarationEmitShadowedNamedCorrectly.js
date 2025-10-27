//// [tests/cases/compiler/defaultDeclarationEmitShadowedNamedCorrectly.ts] ////

//// [this.ts]
import * as me from "./this";
export interface Things<P, T> {
    p: P;
    t: T;
}
export function make<P, CTor>(x: { new (): CTor & {props: P} }): Things<P, CTor> {
    return null as any;
}

export interface Props {
}

export default class MyComponent {
    props: Props;
}
export namespace Something {
    let MyComponent = 2; // Shadow declaration, so symbol is only usable via the self-import
    export const create = make(me.default);
}

//// [this.js]
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
exports.Something = void 0;
exports.make = make;
const me = __importStar(require("./this"));
function make(x) {
    return null;
}
class MyComponent {
    props;
}
exports.default = MyComponent;
var Something;
(function (Something) {
    let MyComponent = 2; // Shadow declaration, so symbol is only usable via the self-import
    Something.create = make(me.default);
})(Something || (exports.Something = Something = {}));


//// [this.d.ts]
import * as me from "./this";
export interface Things<P, T> {
    p: P;
    t: T;
}
export declare function make<P, CTor>(x: {
    new (): CTor & {
        props: P;
    };
}): Things<P, CTor>;
export interface Props {
}
export default class MyComponent {
    props: Props;
}
export declare namespace Something {
    const create: Things<Props, me.default>;
}
