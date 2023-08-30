//// [tests/cases/compiler/indexedAccessRelation.ts] ////

//// [indexedAccessRelation.ts]
// Repro from #14723

class Component<S> {
    setState<K extends keyof S>(state: Pick<S, K>) {}
}

export interface State<T> {
    a?: T;
}

class Foo {}

class Comp<T extends Foo, S> extends Component<S & State<T>>
{
    foo(a: T) {
        this.setState({ a: a });
    }
}


//// [indexedAccessRelation.js]
"use strict";
// Repro from #14723
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
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.setState = function (state) { };
    return Component;
}());
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Comp = /** @class */ (function (_super) {
    __extends(Comp, _super);
    function Comp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comp.prototype.foo = function (a) {
        this.setState({ a: a });
    };
    return Comp;
}(Component));
