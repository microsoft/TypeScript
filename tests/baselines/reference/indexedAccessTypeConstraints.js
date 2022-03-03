//// [indexedAccessTypeConstraints.ts]
// Repro from #14557

interface IData<T> {
    content: T;
}

type Data<T> = {
    get: <K extends keyof T>(prop: K) => T[K];
};

class Parent<M> {
    constructor(private data: Data<M>) {}
    getData(): Data<M> {
        return this.data;
    }
}

export class Foo<C> extends Parent<IData<C>> {
    getContent(): C {
        return this.getData().get('content');
    }
}

export class Bar<C, T extends IData<C>> extends Parent<T> {
    getContent(): C {
        return this.getData().get('content');
    }
}

// Repro from #14557

function foo<C, T extends { content: C }>(x: C, y: T['content']) {
    x = y;
}


//// [indexedAccessTypeConstraints.js]
"use strict";
// Repro from #14557
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
exports.__esModule = true;
exports.Bar = exports.Foo = void 0;
var Parent = /** @class */ (function () {
    function Parent(data) {
        this.data = data;
    }
    Parent.prototype.getData = function () {
        return this.data;
    };
    return Parent;
}());
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Foo.prototype.getContent = function () {
        return this.getData().get('content');
    };
    return Foo;
}(Parent));
exports.Foo = Foo;
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bar.prototype.getContent = function () {
        return this.getData().get('content');
    };
    return Bar;
}(Parent));
exports.Bar = Bar;
// Repro from #14557
function foo(x, y) {
    x = y;
}
