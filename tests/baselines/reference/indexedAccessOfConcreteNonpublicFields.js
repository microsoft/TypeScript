//// [tests/cases/compiler/indexedAccessOfConcreteNonpublicFields.ts] ////

//// [indexedAccessOfConcreteNonpublicFields.ts]
export class Foo {
    private _property: string = '';
    protected _property2: string = '';
    constructor(arg: Foo['_property'], other: Foo['_property2']) {
    }
}

//// [indexedAccessOfConcreteNonpublicFields.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo(arg, other) {
        this._property = '';
        this._property2 = '';
    }
    return Foo;
}());
exports.Foo = Foo;


//// [indexedAccessOfConcreteNonpublicFields.d.ts]
export declare class Foo {
    private _property;
    protected _property2: string;
    constructor(arg: Foo['_property'], other: Foo['_property2']);
}
