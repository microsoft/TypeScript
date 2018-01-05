//// [witness.ts]
// Initializers
var varInit = varInit; // any
var pInit: any;
function fn(pInit = pInit) {
    var pInit: any;
}
class InitClass {
    x = this.x;
    fn() {
        var y = this.x;
        var y: any;
    }
}

// Return type
function fnReturn1() {
    return fnReturn1();
}
var a: any;
var a = fnReturn1();

function fnReturn2() {
    return fnReturn2;
}
var fnr2: () => any = fnReturn2();

// Comma
var co1 = (co1, 3);
var co1: number;
var co2 = (3, 4, co2);
var co2: any;
var co3 = (co1, co2, co3, co1);
var co3: number;

// Assignment
var as1 = (as1 = 2);
var as1: number;
var as2 = (as2 = as2 = 2);
var as2: number;

// Conditional
var cnd1 = cnd1 ? 0 : 1;
var cnd1: number;
var cnd2 = cnd1 ? cnd1 ? '' : "" : '';
var cnd2: string;

// ||
var or1 = or1 || '';
var or1: any;
var or2 = '' || or2;
var or2: any;
var or3 = or3 || or3;
var or3: any;

// &&
var and1 = and1 && '';
var and1: string;
var and2 = '' && and2;
var and2: any;
var and3 = and3 && and3;
var and3: any;

// function call return type
function fnCall() {
    return fnCall();
}
var fnCallResult = fnCall();
var fnCallResult: any;

// Call argument
function fnArg1(x: typeof fnArg1, y: number) {
    var x: (n: typeof fnArg1, m: number) => void;
    fnArg1(fnArg1, 0);
}

function overload1(x: (n: string) => string): string;
function overload1(x: (n: number) => number): number;
function overload1(x: (n: any) => any): any;
function overload1() { return undefined; };

function fnArg2() {
    return overload1(fnArg2);
}
var t = fnArg2(); // t: should be 'any', but is 'string'

// New operator
class C {
    fn1() {
        return new (this.fn1())();
    }
    fn2() {
        return new (this.fn2());
    }
    fn3() {
        var a: new(x) => number;
        return new a(this.fn3);
    }
}

function fn5() {
    var a: new (x) => number;
    return new a(fn5);
}
var fn5r = fn5(); // fn5r: should be 'any', but is 'number'

// Property access
var propAcc1 = {
    m: propAcc1.m
};
var propAcc1: { m: any; }

// Property access of module member
module M2 {
    export var x = M2.x;
    var y = x;
    var y: any;
}

// Property access of class instance type
class C2 {
    n = this.n; // n: any
}
var c2inst = new C2().n;
var c2inst: any;

// Constructor function property access
class C3 {
    static q = C3.q;
}
var qq = C3.q;
var qq: any;

// Parentheses - tested a bunch above




//// [witness.js]
// Initializers
var varInit = varInit; // any
var pInit;
function fn(pInit) {
    if (pInit === void 0) { pInit = pInit; }
    var pInit;
}
var InitClass = /** @class */ (function () {
    function InitClass() {
        this.x = this.x;
    }
    InitClass.prototype.fn = function () {
        var y = this.x;
        var y;
    };
    return InitClass;
}());
// Return type
function fnReturn1() {
    return fnReturn1();
}
var a;
var a = fnReturn1();
function fnReturn2() {
    return fnReturn2;
}
var fnr2 = fnReturn2();
// Comma
var co1 = (co1, 3);
var co1;
var co2 = (3, 4, co2);
var co2;
var co3 = (co1, co2, co3, co1);
var co3;
// Assignment
var as1 = (as1 = 2);
var as1;
var as2 = (as2 = as2 = 2);
var as2;
// Conditional
var cnd1 = cnd1 ? 0 : 1;
var cnd1;
var cnd2 = cnd1 ? cnd1 ? '' : "" : '';
var cnd2;
// ||
var or1 = or1 || '';
var or1;
var or2 = '' || or2;
var or2;
var or3 = or3 || or3;
var or3;
// &&
var and1 = and1 && '';
var and1;
var and2 = '' && and2;
var and2;
var and3 = and3 && and3;
var and3;
// function call return type
function fnCall() {
    return fnCall();
}
var fnCallResult = fnCall();
var fnCallResult;
// Call argument
function fnArg1(x, y) {
    var x;
    fnArg1(fnArg1, 0);
}
function overload1() { return undefined; }
;
function fnArg2() {
    return overload1(fnArg2);
}
var t = fnArg2(); // t: should be 'any', but is 'string'
// New operator
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.fn1 = function () {
        return new (this.fn1())();
    };
    C.prototype.fn2 = function () {
        return new (this.fn2());
    };
    C.prototype.fn3 = function () {
        var a;
        return new a(this.fn3);
    };
    return C;
}());
function fn5() {
    var a;
    return new a(fn5);
}
var fn5r = fn5(); // fn5r: should be 'any', but is 'number'
// Property access
var propAcc1 = {
    m: propAcc1.m
};
var propAcc1;
// Property access of module member
var M2;
(function (M2) {
    M2.x = M2.x;
    var y = M2.x;
    var y;
})(M2 || (M2 = {}));
// Property access of class instance type
var C2 = /** @class */ (function () {
    function C2() {
        this.n = this.n; // n: any
    }
    return C2;
}());
var c2inst = new C2().n;
var c2inst;
// Constructor function property access
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.q = C3.q;
    return C3;
}());
var qq = C3.q;
var qq;
// Parentheses - tested a bunch above
