//// [duplicateFunctionDeclaration.ts]
declare function f1(); // error
declare function f1(); // error

declare function f1A1(a: any); // error
declare function f1A1(a: any); // error

declare function f1A2(a: number); // error
declare function f1A2(a: number); // error

declare function f1A3(a: string); // error
declare function f1A3(a: string); // error

declare function f1A4(a: boolean); // error
declare function f1A4(a: boolean); // error

declare function f1A5(a: any): number; // error
declare function f1A5(a: any): boolean; // error

declare function f1A6(x): number; // error
declare function f1A6(x): boolean; // error 

declare function f1A7(a: any): any; // ok
declare function f1A7(a: boolean): any; // ok

declare function f1A8(a: boolean): void; // error
declare function f1A8(a: boolean); // error

declare function f2(); //ok

declare module M1 {
    function f4(); // error
    export function f4(); // error
    function f4(); // error
}

declare module M2 {
    function f4(); // ok  - not in same block
    function foo(x);   // error  
    function foo(x);   // error 
}

interface I1 {
    foo();   // error  
    foo();   // error 
}

class C1 {
    foo();   // error  
    foo();   // error 
    foo(){}
}

function f5(x: C1); // error  
function f5(x: I1);  // error - Object Type with Identical Set of Members
function f5(){}

interface I2 {
    <T>(x: T): void;   //  error - call signature  
    <T>(x: T): void;   //  error - call signature   

    foo<T>(x: T): void;   //  error
    foo<T>(x: T): void;   //  error 
}

class C2 {
    foo<T, U>(x: T, y: U): T { return null; }
}  
var v1: { foo<T, U>(x: T, y: U): T }
function f7(x: C2); // error  
function f7(x: typeof v1);  // error - Object Type with Identical Set of Members
function f7(){}

class C3 {
    private s: string;
}
class PC3A extends C3 {
    public n:number;   // same members
}
class PC3B extends C3 {
    public n:number ;  // same members
}
class PC3C extends C3 {
    public n:boolean;
}
function f8(x: C3);  // ok
function f8(x: PC3A); // ok - Subclass
function f8(a){};

function f8A(x: C3):C3;  // error
function f8A(x: C3):PC3A; // error 
function f8A(a){ return a;}

function f8B(x: C3):C3; // error
function f8B(x: C3):C3; // error
function f8B(a){ return a;}

function f8C(x: C3, y:PC3A); // error
function f8C(x: C3, y:PC3A); // error
function f8C(a,b){ }

function f8d(x: C3, y: PC3A); // ok
function f8d(x: PC3A, y: C3); // ok
function f8d(a,b){ }

function f8e<T extends C3>(x: T): T; // error    
function f8e<T extends PC3A>(x: T): T; // error Question - Direct Subclass ?
function f8e<C3>(a){}

function f8f<T extends PC3A>(x: T): T; // error - sub class, same members  
function f8f<T extends PC3B>(x: T): T; // error - sub class, same members   
function f8f<PC3A>(a){ }

function f8g<T extends PC3C>(x: T): T; // ok 
function f8g<T extends PC3B>(x: T): T; // ok
function f8g<C3>(a){ }

function f9<T extends Number>(x: T): T; // ok  
function f9<T extends String>(x: T): T; // ok   
function f9<String>(a){ }

function f10A<T>(x: T); // error
function f10A<T>(x: T); // error
function f10A<T>(x: T) { }

function f10B<T>(x: T); // error
function f10B<Y>(z: Y); // error
function f10B(a){ }

class C4<T> {
    f11(x: T); // error, same T
    f11(x: T); // error, same T
    f11(x: T) { }
}

class C5 {
    private foo(n: number);
    private foo(n: Array<number>); // ok
    private foo(n): void {}
}

declare function f12(func: (x: string, y: string) => any): boolean;
declare function f12(func: (x: string, y: number) => any): string;
var out = f12((x, y) => {
    function foo(a: typeof x): void; // error 
    function foo(b: typeof y): void; // error  - type of y is first type = string
    function foo() { }
    return foo;
});

class C10<T> { private x: T; }
interface I10A { f(): string; }
interface I10B { f(): string; }
function f13(a: C10<I10A>); // error
function f13(b: C10<I10B>); // error  - same members
function f13(a: C10<I10A>){}

class C11 {
    constructor(s: string);
    constructor(n: number);
    constructor(s: string); // error - constructor
    constructor(x: any) { } 
}

class C11A {
    constructor(s: string);
    constructor(n: number);
    constructor(s?: string); // ok ? optional parameter constructor
    constructor(x: any) { } 
}

class C12<T> {
    constructor(x: T, y: string);
    constructor(x: T, y: string); // error - constructor
    constructor(x: T) { }
}

var r2 = new C12(1, '');

interface I {
    new (x: number, y: string); // error
    new (x: number, y: string); // error - construct signature
}

type PrimitiveArray = Array<string|number|boolean>;
type MyNumber = number;

declare function f14A(x:PrimitiveArray); // error
declare function f14A(x:Array<string|number|boolean>); // error

declare function f14B(x:PrimitiveArray); // ok
declare function f14B(x:Array<string>); // ok

declare function f14C(x:number); // error
declare function f14C(x:MyNumber); // error

declare enum E1 {
    A = 1,
    B,
    C
}

function f15(e: E1);
function f15(e: number); //ok
function f15(e){}


//// [duplicateFunctionDeclaration.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C1 = (function () {
    function C1() {
    }
    C1.prototype.foo = function () {
    };
    return C1;
})();
function f5() {
}
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x, y) {
        return null;
    };
    return C2;
})();
var v1;
function f7() {
}
var C3 = (function () {
    function C3() {
    }
    return C3;
})();
var PC3A = (function (_super) {
    __extends(PC3A, _super);
    function PC3A() {
        _super.apply(this, arguments);
    }
    return PC3A;
})(C3);
var PC3B = (function (_super) {
    __extends(PC3B, _super);
    function PC3B() {
        _super.apply(this, arguments);
    }
    return PC3B;
})(C3);
var PC3C = (function (_super) {
    __extends(PC3C, _super);
    function PC3C() {
        _super.apply(this, arguments);
    }
    return PC3C;
})(C3);
function f8(a) {
}
;
function f8A(a) {
    return a;
}
function f8B(a) {
    return a;
}
function f8C(a, b) {
}
function f8d(a, b) {
}
function f8e(a) {
}
function f8f(a) {
}
function f8g(a) {
}
function f9(a) {
}
function f10A(x) {
}
function f10B(a) {
}
var C4 = (function () {
    function C4() {
    }
    C4.prototype.f11 = function (x) {
    };
    return C4;
})();
var C5 = (function () {
    function C5() {
    }
    C5.prototype.foo = function (n) {
    };
    return C5;
})();
var out = f12(function (x, y) {
    function foo() {
    }
    return foo;
});
var C10 = (function () {
    function C10() {
    }
    return C10;
})();
function f13(a) {
}
var C11 = (function () {
    function C11(x) {
    }
    return C11;
})();
var C11A = (function () {
    function C11A(x) {
    }
    return C11A;
})();
var C12 = (function () {
    function C12(x) {
    }
    return C12;
})();
var r2 = new C12(1, '');
function f15(e) {
}
