//// [subtypingWithConstructSignatures2.ts]
// checking subtype relations for function types as it relates to contextual signature instantiation

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

declare function foo1(a: new (x: number) => number[]): typeof a;
declare function foo1(a: any): any;

declare function foo2(a: new (x: number) => string[]): typeof a;
declare function foo2(a: any): any;

declare function foo3(a: new (x: number) => void): typeof a;
declare function foo3(a: any): any;

declare function foo4(a: new (x: string, y: number) => string): typeof a;
declare function foo4(a: any): any;

declare function foo5(a: new (x: new (arg: string) => number) => string): typeof a;
declare function foo5(a: any): any;

declare function foo6(a: new (x: new (arg: Base) => Derived) => Base): typeof a;
declare function foo6(a: any): any;

declare function foo7(a: new (x: new (arg: Base) => Derived) => new (r: Base) => Derived): typeof a;
declare function foo7(a: any): any;

declare function foo8(a: new (x: new (arg: Base) => Derived, y: new (arg2: Base) => Derived) => new (r: Base) => Derived): typeof a;
declare function foo8(a: any): any;

declare function foo9(a: new (x: new (arg: Base) => Derived, y: new (arg2: Base) => Derived) => new (r: Base) => Derived): typeof a;
declare function foo9(a: any): any;

declare function foo10(a: new (...x: Derived[]) => Derived): typeof a;
declare function foo10(a: any): any;

declare function foo11(a: new (x: { foo: string }, y: { foo: string; bar: string }) => Base): typeof a;
declare function foo11(a: any): any;

declare function foo12(a: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>): typeof a;
declare function foo12(a: any): any;

declare function foo13(a: new (x: Array<Base>, y: Array<Derived>) => Array<Derived>): typeof a;
declare function foo13(a: any): any;

declare function foo14(a: new (x: { a: string; b: number }) => Object): typeof a;
declare function foo14(a: any): any;

declare function foo15(a: { 
    new (x: number): number[];
    new (x: string): string[]; 
}): typeof a;
declare function foo15(a: any): any;

declare function foo16(a: {
    new <T extends Derived>(x: T): number[];
    new <U extends Base>(x: U): number[];
}): typeof a;
declare function foo16(a: any): any;

declare function foo17(a: {
    new (x: (a: number) => number): number[];
    new (x: (a: string) => string): string[];
}): typeof a;
declare function foo17(a: any): any;

declare function foo18(a: {
    new (x: {
        new (a: number): number;
        new (a: string): string;
    }): any[];
    new (x: {
        new (a: boolean): boolean;
        new (a: Date): Date;
    }): any[];
}): typeof a;
declare function foo18(a: any): any;

var r1arg1: new <T>(x: T) => T[];
var r1arg2: new (x: number) => number[];
var r1 = foo1(r1arg1); // any, return types are not subtype of first overload
var r1a = [r1arg2, r1arg1]; // generic signature, subtype in both directions
var r1b = [r1arg1, r1arg2]; // generic signature, subtype in both directions

var r2arg1: new <T>(x: T) => string[];
var r2arg2: new (x: number) => string[];
var r2 = foo2(r2arg1);
var r2a = [r2arg1, r2arg2];
var r2b = [r2arg2, r2arg1];

var r3arg1: new <T>(x: T) => T;
var r3arg2: new (x: number) => void;
var r3 = foo3(r3arg1);
var r3a = [r3arg1, r3arg2];
var r3b = [r3arg2, r3arg1];

var r4arg1: new <T, U>(x: T, y: U) => T;
var r4arg2: new (x: string, y: number) => string;
var r4 = foo4(r4arg1); // any
var r4a = [r4arg1, r4arg2];
var r4b = [r4arg2, r4arg1];

var r5arg1: new <T, U>(x: new (arg: T) => U) => T;
var r5arg2: new (x: new (arg: string) => number) => string;
var r5 = foo5(r5arg1); // any
var r5a = [r5arg1, r5arg2];
var r5b = [r5arg2, r5arg1];

var r6arg1: new <T extends Base, U extends Derived>(x: new (arg: T) => U) => T;
var r6arg2: new (x: new (arg: Base) => Derived) => Base;
var r6 = foo6(r6arg1); // any
var r6a = [r6arg1, r6arg2];
var r6b = [r6arg2, r6arg1];

var r7arg1: new <T extends Base, U extends Derived>(x: new (arg: T) => U) => new (r: T) => U;
var r7arg2: new (x: new (arg: Base) => Derived) => new (r: Base) => Derived;
var r7 = foo7(r7arg1); // any
var r7a = [r7arg1, r7arg2];
var r7b = [r7arg2, r7arg1];

var r8arg1: new <T extends Base, U extends Derived>(x: new (arg: T) => U, y: new (arg2: T) => U) => new (r: T) => U;
var r8arg2: new (x: new (arg: Base) => Derived, y: new (arg2: Base) => Derived) => new (r: Base) => Derived;
var r8 = foo8(r8arg1); // any
var r8a = [r8arg1, r8arg2];
var r8b = [r8arg2, r8arg1];

var r9arg1: new <T extends Base, U extends Derived>(x: new (arg: T) => U, y: (arg2: { foo: string; bing: number }) => U) => new (r: T) => U;
var r9arg2: new (x: new (arg: Base) => Derived, y: new (arg2: Base) => Derived) => new (r: Base) => Derived;
var r9 = foo9(r9arg1); // any
var r9a = [r9arg1, r9arg2];
var r9b = [r9arg2, r9arg1];

var r10arg1: new <T extends Derived>(...x: T[]) => T;
var r10arg2: new (...x: Derived[]) => Derived;
var r10 = foo10(r10arg1); // any
var r10a = [r10arg1, r10arg2];
var r10b = [r10arg2, r10arg1];

var r11arg1: new <T extends Base>(x: T, y: T) => T;
var r11arg2: new (x: { foo: string }, y: { foo: string; bar: string }) => Base;
var r11 = foo11(r11arg1); // any
var r11a = [r11arg1, r11arg2];
var r11b = [r11arg2, r11arg1];

var r12arg1: new <T extends Array<Base>>(x: Array<Base>, y: T) => Array<Derived>;
var r12arg2: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
var r12 = foo12(r12arg1); // any
var r12a = [r12arg1, r12arg2];
var r12b = [r12arg2, r12arg1];

var r13arg1: new <T extends Array<Derived>>(x: Array<Base>, y: T) => T;
var r13arg2: new (x: Array<Base>, y: Array<Derived>) => Array<Derived>;
var r13 = foo13(r13arg1); // any
var r13a = [r13arg1, r13arg2];
var r13b = [r13arg2, r13arg1];

var r14arg1: new <T>(x: { a: T; b: T }) => T;
var r14arg2: new (x: { a: string; b: number }) => Object;
var r14 = foo14(r14arg1); // any
var r14a = [r14arg1, r14arg2];
var r14b = [r14arg2, r14arg1];

var r15arg1: new <T>(x: T) => T[];
var r15 = foo15(r15arg1); // any
var r16arg1: new <T extends Base>(x: T) => number[];
var r16 = foo16(r16arg1);
var r17arg1: new <T>(x: (a: T) => T) => T[];
var r17 = foo17(r17arg1); // any
var r18arg1: new <T>(x: (a: T) => T) => T[];
var r18 = foo18(r18arg1); 


//// [subtypingWithConstructSignatures2.js]
// checking subtype relations for function types as it relates to contextual signature instantiation
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
var r1 = foo1(r1arg1); // any, return types are not subtype of first overload
var r1a = [r1arg2, r1arg1]; // generic signature, subtype in both directions
var r1b = [r1arg1, r1arg2]; // generic signature, subtype in both directions
var r2arg1;
var r2arg2;
var r2 = foo2(r2arg1);
var r2a = [r2arg1, r2arg2];
var r2b = [r2arg2, r2arg1];
var r3arg1;
var r3arg2;
var r3 = foo3(r3arg1);
var r3a = [r3arg1, r3arg2];
var r3b = [r3arg2, r3arg1];
var r4arg1;
var r4arg2;
var r4 = foo4(r4arg1); // any
var r4a = [r4arg1, r4arg2];
var r4b = [r4arg2, r4arg1];
var r5arg1;
var r5arg2;
var r5 = foo5(r5arg1); // any
var r5a = [r5arg1, r5arg2];
var r5b = [r5arg2, r5arg1];
var r6arg1;
var r6arg2;
var r6 = foo6(r6arg1); // any
var r6a = [r6arg1, r6arg2];
var r6b = [r6arg2, r6arg1];
var r7arg1;
var r7arg2;
var r7 = foo7(r7arg1); // any
var r7a = [r7arg1, r7arg2];
var r7b = [r7arg2, r7arg1];
var r8arg1;
var r8arg2;
var r8 = foo8(r8arg1); // any
var r8a = [r8arg1, r8arg2];
var r8b = [r8arg2, r8arg1];
var r9arg1;
var r9arg2;
var r9 = foo9(r9arg1); // any
var r9a = [r9arg1, r9arg2];
var r9b = [r9arg2, r9arg1];
var r10arg1;
var r10arg2;
var r10 = foo10(r10arg1); // any
var r10a = [r10arg1, r10arg2];
var r10b = [r10arg2, r10arg1];
var r11arg1;
var r11arg2;
var r11 = foo11(r11arg1); // any
var r11a = [r11arg1, r11arg2];
var r11b = [r11arg2, r11arg1];
var r12arg1;
var r12arg2;
var r12 = foo12(r12arg1); // any
var r12a = [r12arg1, r12arg2];
var r12b = [r12arg2, r12arg1];
var r13arg1;
var r13arg2;
var r13 = foo13(r13arg1); // any
var r13a = [r13arg1, r13arg2];
var r13b = [r13arg2, r13arg1];
var r14arg1;
var r14arg2;
var r14 = foo14(r14arg1); // any
var r14a = [r14arg1, r14arg2];
var r14b = [r14arg2, r14arg1];
var r15arg1;
var r15 = foo15(r15arg1); // any
var r16arg1;
var r16 = foo16(r16arg1);
var r17arg1;
var r17 = foo17(r17arg1); // any
var r18arg1;
var r18 = foo18(r18arg1);
