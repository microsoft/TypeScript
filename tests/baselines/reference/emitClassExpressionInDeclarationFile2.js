//// [emitClassExpressionInDeclarationFile2.ts]
export var noPrivates = class {
    static getTags() { }
    tags() { }
    private static ps = -1
    private p = 12
}

// altered repro from #15066 to add private property
export class FooItem {
    foo(): void { }
    name?: string;
    private property = "capitalism"
}

export type Constructor<T> = new(...args: any[]) => T;
export function WithTags<T extends Constructor<FooItem>>(Base: T) {
    return class extends Base {
        static getTags(): void { }
        tags(): void { }
    }
}

export class Test extends WithTags(FooItem) {}

const test = new Test();

Test.getTags()
test.tags();


//// [emitClassExpressionInDeclarationFile2.js]
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
var _a;
exports.__esModule = true;
exports.Test = exports.WithTags = exports.FooItem = exports.noPrivates = void 0;
exports.noPrivates = (_a = /** @class */ (function () {
        function class_1() {
            this.p = 12;
        }
        class_1.getTags = function () { };
        class_1.prototype.tags = function () { };
        return class_1;
    }()),
    _a.ps = -1,
    _a);
// altered repro from #15066 to add private property
var FooItem = /** @class */ (function () {
    function FooItem() {
        this.property = "capitalism";
    }
    FooItem.prototype.foo = function () { };
    return FooItem;
}());
exports.FooItem = FooItem;
function WithTags(Base) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.getTags = function () { };
        class_2.prototype.tags = function () { };
        return class_2;
    }(Base));
}
exports.WithTags = WithTags;
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Test;
}(WithTags(FooItem)));
exports.Test = Test;
var test = new Test();
Test.getTags();
test.tags();
