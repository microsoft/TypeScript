//// [overloadResolutionClassConstructors.ts]
class SomeBase {
    private n;

    public s: string;
}
class SomeDerived1 extends SomeBase {
    private m;
}
class SomeDerived2 extends SomeBase {
    private m;
}
class SomeDerived3 extends SomeBase {
    private m;
}


// Ambiguous call picks the first overload in declaration order
class fn1 {
    constructor(s: string);
    constructor(s: number);
    constructor() { }
}

new fn1(undefined);

// No candidate overloads found
new fn1({}); // Error

// Generic and non - generic overload where generic overload is the only candidate when called with type arguments
class fn2<T> {
    constructor(s: string, n: number);
    constructor(n: number, t: T);
    constructor() { }
}

var d = new fn2<Date>(0, undefined);

// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = new fn2(0, '');

// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
new fn2<Date>('', 0); // OK

// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
new fn2('', 0); // OK

// Generic overloads with differing arity called without type arguments
class fn3<T, U, V> {
    constructor(n: T);
    constructor(s: string, t: T, u: U);
    constructor(v: V, u: U, t: T);
    constructor() { }
}

new fn3(3);
new fn3('', 3, '');
new fn3(5, 5, 5);

// Generic overloads with differing arity called with type arguments matching each overload type parameter count
new fn3<number>(4); // Error
new fn3<string, string>('', '', '');  // Error
new fn3<number, string, string>('', '', 3);

// Generic overloads with differing arity called with type argument count that doesn't match any overload
new fn3<number, number, number, number>(); // Error

// Generic overloads with constraints called with type arguments that satisfy the constraints
class fn4<T extends string, U extends number> {
    constructor(n: T, m: U);
    constructor() { }
}
new fn4<string, number>('', 3);
new fn4<string, number>(3, ''); // Error
new fn4<number, string>('', 3); // Error
new fn4<number, string>(3, ''); // Error

// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
new fn4('', 3);
new fn4(3, ''); // Error
new fn4(3, undefined); // Error
new fn4('', null);

// Generic overloads with constraints called with type arguments that do not satisfy the constraints
new fn4<boolean, Date>(null, null); // Error

// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
new fn4(true, null); // Error
new fn4(null, true); // Error

// Non - generic overloads where contextual typing of function arguments has errors
class fn5 {
    constructor(f: (n: string) => void);
    constructor(f: (n: number) => void);
    constructor() { return undefined; }
}
new fn5((n) => n.toFixed());
new fn5((n) => n.substr(0));
new fn5((n) => n.blah); // Error




//// [overloadResolutionClassConstructors.js]
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
var SomeBase = /** @class */ (function () {
    function SomeBase() {
    }
    return SomeBase;
}());
var SomeDerived1 = /** @class */ (function (_super) {
    __extends(SomeDerived1, _super);
    function SomeDerived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SomeDerived1;
}(SomeBase));
var SomeDerived2 = /** @class */ (function (_super) {
    __extends(SomeDerived2, _super);
    function SomeDerived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SomeDerived2;
}(SomeBase));
var SomeDerived3 = /** @class */ (function (_super) {
    __extends(SomeDerived3, _super);
    function SomeDerived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SomeDerived3;
}(SomeBase));
// Ambiguous call picks the first overload in declaration order
var fn1 = /** @class */ (function () {
    function fn1() {
    }
    return fn1;
}());
new fn1(undefined);
// No candidate overloads found
new fn1({}); // Error
// Generic and non - generic overload where generic overload is the only candidate when called with type arguments
var fn2 = /** @class */ (function () {
    function fn2() {
    }
    return fn2;
}());
var d = new fn2(0, undefined);
// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = new fn2(0, '');
// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
new fn2('', 0); // OK
// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
new fn2('', 0); // OK
// Generic overloads with differing arity called without type arguments
var fn3 = /** @class */ (function () {
    function fn3() {
    }
    return fn3;
}());
new fn3(3);
new fn3('', 3, '');
new fn3(5, 5, 5);
// Generic overloads with differing arity called with type arguments matching each overload type parameter count
new fn3(4); // Error
new fn3('', '', ''); // Error
new fn3('', '', 3);
// Generic overloads with differing arity called with type argument count that doesn't match any overload
new fn3(); // Error
// Generic overloads with constraints called with type arguments that satisfy the constraints
var fn4 = /** @class */ (function () {
    function fn4() {
    }
    return fn4;
}());
new fn4('', 3);
new fn4(3, ''); // Error
new fn4('', 3); // Error
new fn4(3, ''); // Error
// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
new fn4('', 3);
new fn4(3, ''); // Error
new fn4(3, undefined); // Error
new fn4('', null);
// Generic overloads with constraints called with type arguments that do not satisfy the constraints
new fn4(null, null); // Error
// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
new fn4(true, null); // Error
new fn4(null, true); // Error
// Non - generic overloads where contextual typing of function arguments has errors
var fn5 = /** @class */ (function () {
    function fn5() {
        return undefined;
    }
    return fn5;
}());
new fn5(function (n) { return n.toFixed(); });
new fn5(function (n) { return n.substr(0); });
new fn5(function (n) { return n.blah; }); // Error
