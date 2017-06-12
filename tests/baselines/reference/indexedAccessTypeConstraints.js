//// [indexedAccessTypeConstraints.ts]
// Repro from #14557

interface IData<T> {
    content: T;
}

type Data<T> = {
    get: <K extends keyof T>(prop: K) => T[K];
};

class Parent<M> {
    private data: Data<M>;
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
var Parent = (function () {
    function Parent() {
    }
    var proto_1 = Parent.prototype;
    proto_1.getData = function () {
        return this.data;
    };
    return Parent;
}());
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_2 = Foo.prototype;
    proto_2.getContent = function () {
        return this.getData().get('content');
    };
    return Foo;
}(Parent));
exports.Foo = Foo;
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_3 = Bar.prototype;
    proto_3.getContent = function () {
        return this.getData().get('content');
    };
    return Bar;
}(Parent));
exports.Bar = Bar;
// Repro from #14557
function foo(x, y) {
    x = y;
}
