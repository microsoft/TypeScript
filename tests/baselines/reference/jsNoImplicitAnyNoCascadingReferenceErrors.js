//// [tests/cases/compiler/jsNoImplicitAnyNoCascadingReferenceErrors.ts] ////

//// [somelib.d.ts]
export declare class Foo<T> {
    prop: T;
}
//// [index.js]
import {Foo} from "./somelib";

class MyFoo extends Foo {
    constructor() {
        super();
        this.prop.alpha = 12;
    }
}


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
var somelib_1 = require("./somelib");
var MyFoo = /** @class */ (function (_super) {
    __extends(MyFoo, _super);
    function MyFoo() {
        var _this = _super.call(this) || this;
        _this.prop.alpha = 12;
        return _this;
    }
    return MyFoo;
}(somelib_1.Foo));
