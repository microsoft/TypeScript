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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
exports.noPrivates = (_a = (function () {
        function class_1() {
            this.p = 12;
        }
        class_1.getTags = function () { };
        class_1.prototype.tags = function () { };
        __names(class_1.prototype, ["tags"]);
        return class_1;
    }()),
    _a.ps = -1,
    _a);
// altered repro from #15066 to add private property
var FooItem = (function () {
    function FooItem() {
        this.property = "capitalism";
    }
    FooItem.prototype.foo = function () { };
    __names(FooItem.prototype, ["foo"]);
    return FooItem;
}());
exports.FooItem = FooItem;
function WithTags(Base) {
    return (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.getTags = function () { };
        class_2.prototype.tags = function () { };
        __names(class_2.prototype, ["tags"]);
        return class_2;
    }(Base));
}
exports.WithTags = WithTags;
var Test = (function (_super) {
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
var _a;
