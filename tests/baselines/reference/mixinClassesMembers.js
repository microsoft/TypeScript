//// [tests/cases/conformance/classes/mixinClassesMembers.ts] ////

//// [mixinClassesMembers.ts]
declare class C1 {
    public a: number;
    protected b: number;
    private c: number;
    constructor(s: string);
    constructor(n: number);
}

declare class M1 {
    constructor(...args: any[]);
    p: number;
    static p: number;
}

declare class M2 {
    constructor(...args: any[]);
    f(): number;
    static f(): number;
}

declare const Mixed1: typeof M1 & typeof C1;
declare const Mixed2: typeof C1 & typeof M1;
declare const Mixed3: typeof M2 & typeof M1 & typeof C1;
declare const Mixed4: typeof C1 & typeof M1 & typeof M2;
declare const Mixed5: typeof M1 & typeof M2;

function f1() {
    let x1 = new Mixed1("hello");
    let x2 = new Mixed1(42);
    let x3 = new Mixed2("hello");
    let x4 = new Mixed2(42);
    let x5 = new Mixed3("hello");
    let x6 = new Mixed3(42);
    let x7 = new Mixed4("hello");
    let x8 = new Mixed4(42);
    let x9 = new Mixed5();
}

function f2() {
    let x = new Mixed1("hello");
    x.a;
    x.p;
    Mixed1.p;
}

function f3() {
    let x = new Mixed2("hello");
    x.a;
    x.p;
    Mixed2.p;
}

function f4() {
    let x = new Mixed3("hello");
    x.a;
    x.p;
    x.f();
    Mixed3.p;
    Mixed3.f();
}

function f5() {
    let x = new Mixed4("hello");
    x.a;
    x.p;
    x.f();
    Mixed4.p;
    Mixed4.f();
}

function f6() {
    let x = new Mixed5();
    x.p;
    x.f();
    Mixed5.p;
    Mixed5.f();
}

class C2 extends Mixed1 {
    constructor() {
        super("hello");
        this.a;
        this.b;
        this.p;
    }
}

class C3 extends Mixed3 {
    constructor() {
        super(42);
        this.a;
        this.b;
        this.p;
        this.f();
    }
    f() { return super.f(); }
}


//// [mixinClassesMembers.js]
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
function f1() {
    var x1 = new Mixed1("hello");
    var x2 = new Mixed1(42);
    var x3 = new Mixed2("hello");
    var x4 = new Mixed2(42);
    var x5 = new Mixed3("hello");
    var x6 = new Mixed3(42);
    var x7 = new Mixed4("hello");
    var x8 = new Mixed4(42);
    var x9 = new Mixed5();
}
function f2() {
    var x = new Mixed1("hello");
    x.a;
    x.p;
    Mixed1.p;
}
function f3() {
    var x = new Mixed2("hello");
    x.a;
    x.p;
    Mixed2.p;
}
function f4() {
    var x = new Mixed3("hello");
    x.a;
    x.p;
    x.f();
    Mixed3.p;
    Mixed3.f();
}
function f5() {
    var x = new Mixed4("hello");
    x.a;
    x.p;
    x.f();
    Mixed4.p;
    Mixed4.f();
}
function f6() {
    var x = new Mixed5();
    x.p;
    x.f();
    Mixed5.p;
    Mixed5.f();
}
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        var _this = _super.call(this, "hello") || this;
        _this.a;
        _this.b;
        _this.p;
        return _this;
    }
    return C2;
}(Mixed1));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        var _this = _super.call(this, 42) || this;
        _this.a;
        _this.b;
        _this.p;
        _this.f();
        return _this;
    }
    C3.prototype.f = function () { return _super.prototype.f.call(this); };
    return C3;
}(Mixed3));


//// [mixinClassesMembers.d.ts]
declare class C1 {
    a: number;
    protected b: number;
    private c;
    constructor(s: string);
    constructor(n: number);
}
declare class M1 {
    constructor(...args: any[]);
    p: number;
    static p: number;
}
declare class M2 {
    constructor(...args: any[]);
    f(): number;
    static f(): number;
}
declare const Mixed1: typeof M1 & typeof C1;
declare const Mixed2: typeof C1 & typeof M1;
declare const Mixed3: typeof M2 & typeof M1 & typeof C1;
declare const Mixed4: typeof C1 & typeof M1 & typeof M2;
declare const Mixed5: typeof M1 & typeof M2;
declare function f1(): void;
declare function f2(): void;
declare function f3(): void;
declare function f4(): void;
declare function f5(): void;
declare function f6(): void;
declare class C2 extends Mixed1 {
    constructor();
}
declare class C3 extends Mixed3 {
    constructor();
    f(): number;
}
