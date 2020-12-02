//// [subtypingWithConstructSignatures4.ts]
// checking subtype relations for function types as it relates to contextual signature instantiation

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

declare function foo1(a: new <T>(x: T) => T[]);
declare function foo1(a: any): any;

declare function foo2(a2: new <T>(x: T) => string[]);
declare function foo2(a: any): any;

declare function foo3(a3: new <T>(x: T) => void);
declare function foo3(a: any): any;

declare function foo4(a4: new <T, U>(x: T, y: U) => string);
declare function foo4(a: any): any;

declare function foo5(a5: new <T, U>(x: new (arg: T) => U) => T);
declare function foo5(a: any): any;

declare function foo6(a6: new <T extends Base>(x: new (arg: T) => Derived) => T);
declare function foo6(a: any): any;

declare function foo11(a11: new <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base);
declare function foo11(a: any): any;

declare function foo15(a15: new <T>(x: { a: T; b: T }) => T[]);
declare function foo15(a: any): any;

declare function foo16(a16: new <T extends Base>(x: { a: T; b: T }) => T[]);
declare function foo16(a: any): any;

declare function foo17(a17: {
    new <T extends Derived>(x: new (a: T) => T): T[];
    new <T extends Base>(x: new (a: T) => T): T[];        
});
declare function foo17(a: any): any;

declare function foo18(a18: {
    new (x: {
        new <T extends Derived>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
    new (x: {
        new <T extends Derived2>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
});
declare function foo18(a: any): any;

var r1arg: new <T>(x: T) => T[];
var r1arg2: new <T>(x: T) => T[];
var r1 = foo1(r1arg);
var r1a = [r1arg, r1arg2];
var r1b = [r1arg2, r1arg];

var r2arg: new <T>(x: T) => string[];
var r2arg2: new <T>(x: T) => string[];
var r2 = foo2(r2arg);
var r2a = [r2arg, r2arg2];
var r2b = [r2arg2, r2arg];

var r3arg: new <T>(x: T) => T;
var r3arg2: new <T>(x: T) => void;
var r3 = foo3(r3arg);
var r3a = [r3arg, r3arg2];
var r3b = [r3arg2, r3arg];

var r4arg: new <T, U>(x: T, y: U) => string;
var r4arg2: new <T, U>(x: T, y: U) => string;
var r4 = foo4(r4arg);
var r4a = [r4arg, r4arg2];
var r4b = [r4arg2, r4arg];

var r5arg: new <T, U>(x: new (arg: T) => U) => T;
var r5arg2: new <T, U>(x: new (arg: T) => U) => T;
var r5 = foo5(r5arg);
var r5a = [r5arg, r5arg2];
var r5b = [r5arg2, r5arg];

var r6arg: new <T extends Base, U extends Derived>(x: new (arg: T) => U) => T;
var r6arg2: new <T extends Base>(x: new (arg: T) => Derived) => T;
var r6 = foo6(r6arg);
var r6a = [r6arg, r6arg2];
var r6b = [r6arg2, r6arg];

var r11arg: new <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base;
var r11arg2: new <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base;
var r11 = foo11(r11arg);
var r11a = [r11arg, r11arg2];
var r11b = [r11arg2, r11arg];

var r15arg: new <U, V>(x: { a: U; b: V; }) => U[];
var r15arg2: new <T>(x: { a: T; b: T }) => T[];
var r15 = foo15(r15arg);
var r15a = [r15arg, r15arg2];
var r15b = [r15arg2, r15arg];

var r16arg: new <T extends Base>(x: { a: T; b: T }) => T[];
var r16arg2: new <T extends Base>(x: { a: T; b: T }) => T[];
var r16 = foo16(r16arg);
var r16a = [r16arg, r16arg2];
var r16b = [r16arg2, r16arg];

var r17arg: new <T>(x: new (a: T) => T) => T[];
var r17 = foo17(r17arg);

var r18arg: new (x: new <T>(a: T) => T) => any[];
var r18 = foo18(r18arg);

//// [subtypingWithConstructSignatures4.js]
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
var r1arg;
var r1arg2;
var r1 = foo1(r1arg);
var r1a = [r1arg, r1arg2];
var r1b = [r1arg2, r1arg];
var r2arg;
var r2arg2;
var r2 = foo2(r2arg);
var r2a = [r2arg, r2arg2];
var r2b = [r2arg2, r2arg];
var r3arg;
var r3arg2;
var r3 = foo3(r3arg);
var r3a = [r3arg, r3arg2];
var r3b = [r3arg2, r3arg];
var r4arg;
var r4arg2;
var r4 = foo4(r4arg);
var r4a = [r4arg, r4arg2];
var r4b = [r4arg2, r4arg];
var r5arg;
var r5arg2;
var r5 = foo5(r5arg);
var r5a = [r5arg, r5arg2];
var r5b = [r5arg2, r5arg];
var r6arg;
var r6arg2;
var r6 = foo6(r6arg);
var r6a = [r6arg, r6arg2];
var r6b = [r6arg2, r6arg];
var r11arg;
var r11arg2;
var r11 = foo11(r11arg);
var r11a = [r11arg, r11arg2];
var r11b = [r11arg2, r11arg];
var r15arg;
var r15arg2;
var r15 = foo15(r15arg);
var r15a = [r15arg, r15arg2];
var r15b = [r15arg2, r15arg];
var r16arg;
var r16arg2;
var r16 = foo16(r16arg);
var r16a = [r16arg, r16arg2];
var r16b = [r16arg2, r16arg];
var r17arg;
var r17 = foo17(r17arg);
var r18arg;
var r18 = foo18(r18arg);
