//// [subtypingWithConstructSignatures3.ts]
// checking subtype relations for function types as it relates to contextual signature instantiation
// error cases, so function calls will all result in 'any'

module Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    declare function foo2(a2: new (x: number) => string[]): typeof a2;
    declare function foo2(a2: any): any;

    declare function foo7(a2: new (x: new (arg: Base) => Derived) => new (r: Base) => Derived2): typeof a2;
    declare function foo7(a2: any): any;

    declare function foo8(a2: new (x: new (arg: Base) => Derived, y: new (arg2: Base) => Derived) => new (r: Base) => Derived): typeof a2;
    declare function foo8(a2: any): any;

    declare function foo10(a2: new (...x: Base[]) => Base): typeof a2;
    declare function foo10(a2: any): any;

    declare function foo11(a2: new (x: { foo: string }, y: { foo: string; bar: string }) => Base): typeof a2;
    declare function foo11(a2: any): any;

    declare function foo12(a2: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>): typeof a2;
    declare function foo12(a2: any): any;

    declare function foo15(a2: new (x: { a: string; b: number }) => number): typeof a2;
    declare function foo15(a2: any): any;

    declare function foo16(a2: {
        // type of parameter is overload set which means we can't do inference based on this type
        new (x: {
            new (a: number): number;
            new (a?: number): number;
        }): number[];
        new (x: {
            new (a: boolean): boolean;
            new (a?: boolean): boolean;
        }): boolean[];
    }): typeof a2;
    declare function foo16(a2: any): any;

    declare function foo17(a2: {
        new (x: {
            new <T extends Derived>(a: T): T;
            new <T extends Base>(a: T): T;
        }): any[];
        new (x: {
            new <T extends Derived2>(a: T): T;
            new <T extends Base>(a: T): T;
        }): any[];
    }): typeof a2;
    declare function foo17(a2: any): any;

    var r1arg1: new <T, U>(x: T) => U[];
    var r1arg2: new (x: number) => string[]; 
    var r1 = foo2(r1arg1); // any
    var r1a = [r1arg2, r1arg1];
    var r1b = [r1arg1, r1arg2];

    var r2arg1: new <T extends Base, U extends Derived, V extends Derived2>(x: new (arg: T) => U) => new (r: T) => V;
    var r2arg2: new (x: new (arg: Base) => Derived) => new (r: Base) => Derived2;
    var r2 = foo7(r2arg1); // any
    var r2a = [r2arg2, r2arg1];
    var r2b = [r2arg1, r2arg2];

    var r3arg1: new <T extends Base, U extends Derived>(x: new (arg: T) => U, y: (arg2: { foo: number; }) => U) => new (r: T) => U;
    var r3arg2: new (x: (arg: Base) => Derived, y: new (arg2: Base) => Derived) => new (r: Base) => Derived;
    var r3 = foo8(r3arg1); // any
    var r3a = [r3arg2, r3arg1];
    var r3b = [r3arg1, r3arg2];

    var r4arg1: new <T extends Derived>(...x: T[]) => T;
    var r4arg2: new (...x: Base[]) => Base;
    var r4 = foo10(r4arg1); // any
    var r4a = [r4arg2, r4arg1];
    var r4b = [r4arg1, r4arg2];

    var r5arg1: new <T extends Derived>(x: T, y: T) => T;
    var r5arg2: new (x: { foo: string }, y: { foo: string; bar: string }) => Base;
    var r5 = foo11(r5arg1); // any
    var r5a = [r5arg2, r5arg1];
    var r5b = [r5arg1, r5arg2];

    var r6arg1: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
    var r6arg2: new <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => T;
    var r6 = foo12(r6arg1); // new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>
    var r6a = [r6arg2, r6arg1];
    var r6b = [r6arg1, r6arg2];

    var r7arg1: new <T>(x: { a: T; b: T }) => T;
    var r7arg2: new (x: { a: string; b: number }) => number;
    var r7 = foo15(r7arg1); // (x: { a: string; b: number }) => number): number;
    var r7a = [r7arg2, r7arg1];
    var r7b = [r7arg1, r7arg2];

    var r7arg3: new <T extends Base>(x: { a: T; b: T }) => number;
    var r7c = foo15(r7arg3); // any
    var r7d = [r7arg2, r7arg3];
    var r7e = [r7arg3, r7arg2];

    var r8arg: new <T>(x: new (a: T) => T) => T[];
    var r8 = foo16(r8arg); // any

    var r9arg: new <T>(x: new (a: T) => T) => any[];
    var r9 = foo17(r9arg); // // (x: { <T extends Derived >(a: T): T; <T extends Base >(a: T): T; }): any[]; (x: { <T extends Derived2>(a: T): T; <T extends Base>(a: T): T; }): any[];
}

module WithGenericSignaturesInBaseType {
    declare function foo2(a2: new <T>(x: T) => T[]): typeof a2;
    declare function foo2(a2: any): any;
    var r2arg2: new <T>(x: T) => string[];
    var r2 = foo2(r2arg2); // <T>(x:T) => T[] since we can infer from generic signatures now

    declare function foo3(a2: new <T>(x: T) => string[]): typeof a2;
    declare function foo3(a2: any): any;
    var r3arg2: new <T>(x: T) => T[];
    var r3 = foo3(r3arg2); // any
}

//// [subtypingWithConstructSignatures3.js]
// checking subtype relations for function types as it relates to contextual signature instantiation
// error cases, so function calls will all result in 'any'
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
var Errors;
(function (Errors) {
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    var Derived = /** @class */ (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived;
    }(Base));
    var Derived2 = /** @class */ (function (_super) {
        __extends(Derived2, _super);
        function Derived2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived2;
    }(Derived));
    var OtherDerived = /** @class */ (function (_super) {
        __extends(OtherDerived, _super);
        function OtherDerived() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OtherDerived;
    }(Base));
    var r1arg1;
    var r1arg2;
    var r1 = foo2(r1arg1); // any
    var r1a = [r1arg2, r1arg1];
    var r1b = [r1arg1, r1arg2];
    var r2arg1;
    var r2arg2;
    var r2 = foo7(r2arg1); // any
    var r2a = [r2arg2, r2arg1];
    var r2b = [r2arg1, r2arg2];
    var r3arg1;
    var r3arg2;
    var r3 = foo8(r3arg1); // any
    var r3a = [r3arg2, r3arg1];
    var r3b = [r3arg1, r3arg2];
    var r4arg1;
    var r4arg2;
    var r4 = foo10(r4arg1); // any
    var r4a = [r4arg2, r4arg1];
    var r4b = [r4arg1, r4arg2];
    var r5arg1;
    var r5arg2;
    var r5 = foo11(r5arg1); // any
    var r5a = [r5arg2, r5arg1];
    var r5b = [r5arg1, r5arg2];
    var r6arg1;
    var r6arg2;
    var r6 = foo12(r6arg1); // new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>
    var r6a = [r6arg2, r6arg1];
    var r6b = [r6arg1, r6arg2];
    var r7arg1;
    var r7arg2;
    var r7 = foo15(r7arg1); // (x: { a: string; b: number }) => number): number;
    var r7a = [r7arg2, r7arg1];
    var r7b = [r7arg1, r7arg2];
    var r7arg3;
    var r7c = foo15(r7arg3); // any
    var r7d = [r7arg2, r7arg3];
    var r7e = [r7arg3, r7arg2];
    var r8arg;
    var r8 = foo16(r8arg); // any
    var r9arg;
    var r9 = foo17(r9arg); // // (x: { <T extends Derived >(a: T): T; <T extends Base >(a: T): T; }): any[]; (x: { <T extends Derived2>(a: T): T; <T extends Base>(a: T): T; }): any[];
})(Errors || (Errors = {}));
var WithGenericSignaturesInBaseType;
(function (WithGenericSignaturesInBaseType) {
    var r2arg2;
    var r2 = foo2(r2arg2); // <T>(x:T) => T[] since we can infer from generic signatures now
    var r3arg2;
    var r3 = foo3(r3arg2); // any
})(WithGenericSignaturesInBaseType || (WithGenericSignaturesInBaseType = {}));
