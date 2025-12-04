//// [tests/cases/compiler/emitClassExpressionInDeclarationFile.ts] ////

//// [emitClassExpressionInDeclarationFile.ts]
export var simpleExample = class {
    static getTags() { }
    tags() { }
}
export var circularReference = class C {
    static getTags(c: C): C { return c }
    tags(c: C): C { return c }
}

// repro from #15066
export class FooItem {
    foo(): void { }
    name?: string;
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


//// [emitClassExpressionInDeclarationFile.js]
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
exports.Test = exports.FooItem = exports.circularReference = exports.simpleExample = void 0;
exports.WithTags = WithTags;
exports.simpleExample = /** @class */ (function () {
    function simpleExample() {
    }
    simpleExample.getTags = function () { };
    simpleExample.prototype.tags = function () { };
    return simpleExample;
}());
exports.circularReference = /** @class */ (function () {
    function C() {
    }
    C.getTags = function (c) { return c; };
    C.prototype.tags = function (c) { return c; };
    return C;
}());
// repro from #15066
var FooItem = /** @class */ (function () {
    function FooItem() {
    }
    FooItem.prototype.foo = function () { };
    return FooItem;
}());
exports.FooItem = FooItem;
function WithTags(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.getTags = function () { };
        class_1.prototype.tags = function () { };
        return class_1;
    }(Base));
}
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


//// [emitClassExpressionInDeclarationFile.d.ts]
export declare var simpleExample: {
    new (): {
        tags(): void;
    };
    getTags(): void;
};
export declare var circularReference: {
    new (): {
        tags(c: /*elided*/ any): /*elided*/ any;
    };
    getTags(c: {
        tags(c: /*elided*/ any): /*elided*/ any;
    }): {
        tags(c: /*elided*/ any): /*elided*/ any;
    };
};
export declare class FooItem {
    foo(): void;
    name?: string;
}
export type Constructor<T> = new (...args: any[]) => T;
export declare function WithTags<T extends Constructor<FooItem>>(Base: T): {
    new (...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & T;
declare const Test_base: {
    new (...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & typeof FooItem;
export declare class Test extends Test_base {
}
export {};
