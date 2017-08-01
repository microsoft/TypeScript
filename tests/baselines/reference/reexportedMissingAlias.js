//// [tests/cases/compiler/reexportedMissingAlias.ts] ////

//// [second.d.ts]
// Fixes #15094
export import Component = CompletelyMissing;
//// [first.d.ts]
import * as Second from './second';
export = Second;
//// [crash.ts]
import { Component } from './first';
class C extends Component { }


//// [crash.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var first_1 = require("./first");
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(first_1.Component));
