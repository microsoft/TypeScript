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
exports.__esModule = true;
//// [custom.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.mixin = void 0;
exports.mixin = function (Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.get = function (domNode) { };
        return class_1;
    }(Base));
};


//// [dom.d.ts]
export declare type DOMNode = Node;
//// [custom.d.ts]
export declare type Node = {};
//// [index.d.ts]
export declare const mixin: (Base: Constructor) => {
    new (...args: any[]): {
        [x: string]: any;
        get(domNode: DOMNode): void;
    };
};


//// [DtsFileErrors]


tests/cases/compiler/index.d.ts(1,36): error TS2304: Cannot find name 'Constructor'.
tests/cases/compiler/index.d.ts(4,22): error TS2304: Cannot find name 'DOMNode'.


==== tests/cases/compiler/dom.d.ts (0 errors) ====
    export declare type DOMNode = Node;
    
==== tests/cases/compiler/custom.d.ts (0 errors) ====
    export declare type Node = {};
    
==== tests/cases/compiler/index.d.ts (2 errors) ====
    export declare const mixin: (Base: Constructor) => {
                                       ~~~~~~~~~~~
!!! error TS2304: Cannot find name 'Constructor'.
        new (...args: any[]): {
            [x: string]: any;
            get(domNode: DOMNode): void;
                         ~~~~~~~
!!! error TS2304: Cannot find name 'DOMNode'.
        };
    };
    