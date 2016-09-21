//// [declarationEmitPrivateMembers.ts]

class A {
    // private fields
    private field1: number;
    private static field1: number;
    private readonly field2: number;
    private static readonly field2: number;
    // private properties
    private get prop1(): string { return "string"; }
    private set prop1(v: string) { }
    private get prop2(): string { return "string"; }
    private set prop3(v: string) { }
    private static get prop1(): string { return "string"; }
    private static set prop1(v: string) { }
    private static get prop2(): string { return "string"; }
    private static set prop3(v: string) { }
    // private methods
    private method1(a: number): string { return "string"; }
    private static method1(a: number): string { return "string"; }
    // private methods with overloads
    private method2(a: string): void;
    private method2(a: number): void;
    private method2(a: string | number): void { }
    private static method2(a: string): void;
    private static method2(a: number): void;
    private static method2(a: string | number): void { }
    // private methods as fields
    private method3: (a: number) => string;
    private static method3: (a: number) => string;
    // private constructors with overloads
    private constructor(a: number);
    private constructor(a: string);
    private constructor(a: number | string) { }
}

//// [declarationEmitPrivateMembers.js]
var A = (function () {
    function A(a) {
    }
    Object.defineProperty(A.prototype, "prop1", {
        // private properties
        get: function () { return "string"; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A.prototype, "prop2", {
        get: function () { return "string"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A.prototype, "prop3", {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A, "prop1", {
        get: function () { return "string"; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A, "prop2", {
        get: function () { return "string"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A, "prop3", {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    // private methods
    A.prototype.method1 = function (a) { return "string"; };
    A.method1 = function (a) { return "string"; };
    A.prototype.method2 = function (a) { };
    A.method2 = function (a) { };
    return A;
}());


//// [declarationEmitPrivateMembers.d.ts]
declare class A {
    private field1;
    private static field1;
    private readonly field2;
    private static readonly field2;
    private prop1;
    private readonly prop2;
    private prop3;
    private static prop1;
    private static readonly prop2;
    private static prop3;
    private method1;
    private static method1;
    private method2;
    private static method2;
    private method3;
    private static method3;
    private constructor();
}
