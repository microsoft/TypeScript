//// [tests/cases/compiler/optionalParamArgsTest.ts] ////

//// [optionalParamArgsTest.ts]
// Optional parameter and default argument tests

// Key:
// Cx - "Class x"
// My - "Method x"
// Az - "Argument z"
// E.g., C1M1A1 = "Class 1, Method 1, Argument 1"

interface I1 {
    C1M1():number;
    C1M2(C1M2A1:number):number;
    C1M3(C1M3A1?:number,C1M3A2?:number):number;
    C1M4(C1M4A1:number,C1M4A2?:number):number;
}

// test basic configurations
class C1 {
    constructor(v: number = 1, p: number = 0) { }
    public n:number = 0;

    public C1M1() { return 0; } // returning C1M1A1 will result in "Unresolved symbol C1M1A1"

    public C1M2(C1M2A1:number) { return C1M2A1; } // will return C1M1A2 without complaint

    // C1M3 contains all optional parameters
    public C1M3(C1M3A1:number=0,C1M3A2:number=C1M3A1) {return C1M3A1 + C1M3A2; }

    // C1M4 contains a mix of optional and non-optional parameters
    public C1M4(C1M4A1:number,C1M4A2?:number) { return C1M4A1 + C1M4A2; }

    public C1M5(C1M5A1:number,C1M5A2:number=0,C1M5A3?:number) { return C1M5A1 + C1M5A2; }

    // Uninitialized parameter makes the initialized one required
    public C1M5(C1M5A1:number,C1M5A2:number=0,C1M5A3:number) { return C1M5A1 + C1M5A2; }
}

class C2 extends C1 {
    constructor(v2: number = 6) {
        super(v2);
    }
}


function F1() { return 0; } 
function F2(F2A1:number) { return F2A1; } 
function F3(F3A1=0,F3A2=F3A1) {return F3A1 + F3A2; }
function F4(F4A1:number,F4A2?:number) { return F4A1 + F4A2; }

var L1 = function() {return 0;}
var L2 = function (L2A1:number) { return L2A1; } 
var L3 = function (L3A1=0,L3A2=L3A1) {return L3A1 + L3A2; }
var L4 = function (L4A1:number,L4A2?:number) { return L4A1 + L4A2; }

var c1o1:C1 = new C1(5);
var i1o1:I1 = new C1(5);
// Valid
c1o1.C1M1();
var f1v1=F1();
var l1v1=L1();

// Valid
c1o1.C1M2(1);
i1o1.C1M2(1);
var f2v1=F2(1);
var l2v1=L2(1);

// Valid
c1o1.C1M3(1,2);
i1o1.C1M3(1,2);
var f3v1=F3(1,2);
var l3v1=L3(1,2);

// Valid
c1o1.C1M4(1,2);
i1o1.C1M4(1,2);
var f4v1=F4(1,2);
var l4v1=L4(1,2);

// Valid
c1o1.C1M3(1);
i1o1.C1M3(1);
var f3v2=F3(1);
var l3v2=L3(1);

// Valid 
c1o1.C1M3();
i1o1.C1M3();
var f3v3=F3();
var l3v3=L3();

// Valid
c1o1.C1M4(1);
i1o1.C1M4(1);
var f4v2=F4(1);
var l4v2=L4(1);

// Negative tests - we expect these cases to fail
c1o1.C1M1(1);
i1o1.C1M1(1);
F1(1);
L1(1);
c1o1.C1M2();
i1o1.C1M2();
F2();
L2();
c1o1.C1M2(1,2);
i1o1.C1M2(1,2);
F2(1,2);
L2(1,2);
c1o1.C1M3(1,2,3);
i1o1.C1M3(1,2,3);
F3(1,2,3);
L3(1,2,3);
c1o1.C1M4();
i1o1.C1M4();
F4();
L4();

function fnOpt1(id: number, children: number[] = [], expectedPath: number[] = [], isRoot?: boolean): void {}
function fnOpt2(id: number, children?: number[], expectedPath?: number[], isRoot?: boolean): void {}
fnOpt1(1, [2, 3], [1], true);
fnOpt2(1, [2, 3], [1], true);


//// [optionalParamArgsTest.js]
// Optional parameter and default argument tests
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
// test basic configurations
var C1 = /** @class */ (function () {
    function C1(v, p) {
        if (v === void 0) { v = 1; }
        if (p === void 0) { p = 0; }
        this.n = 0;
    }
    C1.prototype.C1M1 = function () { return 0; }; // returning C1M1A1 will result in "Unresolved symbol C1M1A1"
    C1.prototype.C1M2 = function (C1M2A1) { return C1M2A1; }; // will return C1M1A2 without complaint
    // C1M3 contains all optional parameters
    C1.prototype.C1M3 = function (C1M3A1, C1M3A2) {
        if (C1M3A1 === void 0) { C1M3A1 = 0; }
        if (C1M3A2 === void 0) { C1M3A2 = C1M3A1; }
        return C1M3A1 + C1M3A2;
    };
    // C1M4 contains a mix of optional and non-optional parameters
    C1.prototype.C1M4 = function (C1M4A1, C1M4A2) { return C1M4A1 + C1M4A2; };
    C1.prototype.C1M5 = function (C1M5A1, C1M5A2, C1M5A3) {
        if (C1M5A2 === void 0) { C1M5A2 = 0; }
        return C1M5A1 + C1M5A2;
    };
    // Uninitialized parameter makes the initialized one required
    C1.prototype.C1M5 = function (C1M5A1, C1M5A2, C1M5A3) {
        if (C1M5A2 === void 0) { C1M5A2 = 0; }
        return C1M5A1 + C1M5A2;
    };
    return C1;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2(v2) {
        if (v2 === void 0) { v2 = 6; }
        return _super.call(this, v2) || this;
    }
    return C2;
}(C1));
function F1() { return 0; }
function F2(F2A1) { return F2A1; }
function F3(F3A1, F3A2) {
    if (F3A1 === void 0) { F3A1 = 0; }
    if (F3A2 === void 0) { F3A2 = F3A1; }
    return F3A1 + F3A2;
}
function F4(F4A1, F4A2) { return F4A1 + F4A2; }
var L1 = function () { return 0; };
var L2 = function (L2A1) { return L2A1; };
var L3 = function (L3A1, L3A2) {
    if (L3A1 === void 0) { L3A1 = 0; }
    if (L3A2 === void 0) { L3A2 = L3A1; }
    return L3A1 + L3A2;
};
var L4 = function (L4A1, L4A2) { return L4A1 + L4A2; };
var c1o1 = new C1(5);
var i1o1 = new C1(5);
// Valid
c1o1.C1M1();
var f1v1 = F1();
var l1v1 = L1();
// Valid
c1o1.C1M2(1);
i1o1.C1M2(1);
var f2v1 = F2(1);
var l2v1 = L2(1);
// Valid
c1o1.C1M3(1, 2);
i1o1.C1M3(1, 2);
var f3v1 = F3(1, 2);
var l3v1 = L3(1, 2);
// Valid
c1o1.C1M4(1, 2);
i1o1.C1M4(1, 2);
var f4v1 = F4(1, 2);
var l4v1 = L4(1, 2);
// Valid
c1o1.C1M3(1);
i1o1.C1M3(1);
var f3v2 = F3(1);
var l3v2 = L3(1);
// Valid 
c1o1.C1M3();
i1o1.C1M3();
var f3v3 = F3();
var l3v3 = L3();
// Valid
c1o1.C1M4(1);
i1o1.C1M4(1);
var f4v2 = F4(1);
var l4v2 = L4(1);
// Negative tests - we expect these cases to fail
c1o1.C1M1(1);
i1o1.C1M1(1);
F1(1);
L1(1);
c1o1.C1M2();
i1o1.C1M2();
F2();
L2();
c1o1.C1M2(1, 2);
i1o1.C1M2(1, 2);
F2(1, 2);
L2(1, 2);
c1o1.C1M3(1, 2, 3);
i1o1.C1M3(1, 2, 3);
F3(1, 2, 3);
L3(1, 2, 3);
c1o1.C1M4();
i1o1.C1M4();
F4();
L4();
function fnOpt1(id, children, expectedPath, isRoot) {
    if (children === void 0) { children = []; }
    if (expectedPath === void 0) { expectedPath = []; }
}
function fnOpt2(id, children, expectedPath, isRoot) { }
fnOpt1(1, [2, 3], [1], true);
fnOpt2(1, [2, 3], [1], true);
