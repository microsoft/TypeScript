//// [tests/cases/compiler/declarationsForFileShadowingGlobalNoError.ts] ////

//// [dom.ts]
export type DOMNode = Node;
//// [custom.ts]
export type Node = {};
//// [index.ts]
import { Node } from './custom'
import { DOMNode } from './dom'

type Constructor = new (...args: any[]) => any

export const mixin = (Base: Constructor) => {
  return class extends Base {
    get(domNode: DOMNode) {}
  }
}

//// [dom.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [custom.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = void 0;
var mixin = function (Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.get = function (domNode) { };
        return class_1;
    }(Base));
};
exports.mixin = mixin;


//// [dom.d.ts]
export type DOMNode = Node;
//// [custom.d.ts]
export type Node = {};
//// [index.d.ts]
import { DOMNode } from './dom';
type Constructor = new (...args: any[]) => any;
export declare const mixin: (Base: Constructor) => {
    new (...args: any[]): {
        [x: string]: any;
        get(domNode: DOMNode): void;
    };
};
export {};
