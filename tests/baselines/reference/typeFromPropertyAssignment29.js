//// [typeFromPropertyAssignment29.ts]
function ExpandoDecl(n: number) {
    return n.toString();
}
ExpandoDecl.prop = 2
ExpandoDecl.m = function(n: number) {
    return n + 1;
}
var n = ExpandoDecl.prop + ExpandoDecl.m(12) + ExpandoDecl(101).length

const ExpandoExpr = function (n: number) {
    return n.toString();
}
ExpandoExpr.prop = { x: 2 }
ExpandoExpr.prop = { y: "" }
ExpandoExpr.m = function(n: number) {
    return n + 1;
}
var n = (ExpandoExpr.prop.x || 0) + ExpandoExpr.m(12) + ExpandoExpr(101).length

const ExpandoArrow = (n: number) => n.toString();
ExpandoArrow.prop = 2
ExpandoArrow.m = function(n: number) {
    return n + 1;

}

function ExpandoNested(n: number) {
    const nested = function (m: number) {
        return n + m;
    };
    nested.total = n + 1_000_000;
    return nested;
}
ExpandoNested.also = -1;

function ExpandoMerge(n: number) {
    return n * 100;
}
ExpandoMerge.p1 = 111
namespace ExpandoMerge {
    export var p2 = 222;
}
namespace ExpandoMerge {
    export var p3 = 333;
}
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge(1);

namespace Ns {
    function ExpandoNamespace(): void {}
    ExpandoNamespace.p6 = 42;
    export function foo() {
        return ExpandoNamespace;
    }
}

// Should not work in Typescript -- must be const
var ExpandoExpr2 = function (n: number) {
    return n.toString();
}
ExpandoExpr2.prop = 2
ExpandoExpr2.m = function(n: number) {
    return n + 1;
}
var n = ExpandoExpr2.prop + ExpandoExpr2.m(12) + ExpandoExpr2(101).length

// Should not work in typescript -- classes already have statics
class ExpandoClass {
    n = 1001;
}
ExpandoClass.prop = 2
ExpandoClass.m = function(n: number) {
    return n + 1;
}
var n = ExpandoClass.prop + ExpandoClass.m(12) + new ExpandoClass().n

// Class expressions shouldn't work in typescript either
var ExpandoExpr3 = class {
    n = 10001;
}
ExpandoExpr3.prop = 3
ExpandoExpr3.m = function(n: number) {
    return n + 1;
}
var n = ExpandoExpr3.prop + ExpandoExpr3.m(13) + new ExpandoExpr3().n



//// [typeFromPropertyAssignment29.js]
function ExpandoDecl(n) {
    return n.toString();
}
ExpandoDecl.prop = 2;
ExpandoDecl.m = function (n) {
    return n + 1;
};
var n = ExpandoDecl.prop + ExpandoDecl.m(12) + ExpandoDecl(101).length;
var ExpandoExpr = function (n) {
    return n.toString();
};
ExpandoExpr.prop = { x: 2 };
ExpandoExpr.prop = { y: "" };
ExpandoExpr.m = function (n) {
    return n + 1;
};
var n = (ExpandoExpr.prop.x || 0) + ExpandoExpr.m(12) + ExpandoExpr(101).length;
var ExpandoArrow = function (n) { return n.toString(); };
ExpandoArrow.prop = 2;
ExpandoArrow.m = function (n) {
    return n + 1;
};
function ExpandoNested(n) {
    var nested = function (m) {
        return n + m;
    };
    nested.total = n + 1000000;
    return nested;
}
ExpandoNested.also = -1;
function ExpandoMerge(n) {
    return n * 100;
}
ExpandoMerge.p1 = 111;
(function (ExpandoMerge) {
    ExpandoMerge.p2 = 222;
})(ExpandoMerge || (ExpandoMerge = {}));
(function (ExpandoMerge) {
    ExpandoMerge.p3 = 333;
})(ExpandoMerge || (ExpandoMerge = {}));
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge(1);
var Ns;
(function (Ns) {
    function ExpandoNamespace() { }
    ExpandoNamespace.p6 = 42;
    function foo() {
        return ExpandoNamespace;
    }
    Ns.foo = foo;
})(Ns || (Ns = {}));
// Should not work in Typescript -- must be const
var ExpandoExpr2 = function (n) {
    return n.toString();
};
ExpandoExpr2.prop = 2;
ExpandoExpr2.m = function (n) {
    return n + 1;
};
var n = ExpandoExpr2.prop + ExpandoExpr2.m(12) + ExpandoExpr2(101).length;
// Should not work in typescript -- classes already have statics
var ExpandoClass = /** @class */ (function () {
    function ExpandoClass() {
        this.n = 1001;
    }
    return ExpandoClass;
}());
ExpandoClass.prop = 2;
ExpandoClass.m = function (n) {
    return n + 1;
};
var n = ExpandoClass.prop + ExpandoClass.m(12) + new ExpandoClass().n;
// Class expressions shouldn't work in typescript either
var ExpandoExpr3 = /** @class */ (function () {
    function class_1() {
        this.n = 10001;
    }
    return class_1;
}());
ExpandoExpr3.prop = 3;
ExpandoExpr3.m = function (n) {
    return n + 1;
};
var n = ExpandoExpr3.prop + ExpandoExpr3.m(13) + new ExpandoExpr3().n;


//// [typeFromPropertyAssignment29.d.ts]
declare function ExpandoDecl(n: number): string;
declare namespace ExpandoDecl {
    var prop: number;
    var m: (n: number) => number;
}
declare var n: number;
declare const ExpandoExpr: {
    (n: number): string;
    prop: {
        x: number;
        y?: undefined;
    } | {
        y: string;
        x?: undefined;
    };
    m(n: number): number;
};
declare var n: number;
declare const ExpandoArrow: {
    (n: number): string;
    prop: number;
    m(n: number): number;
};
declare function ExpandoNested(n: number): {
    (m: number): number;
    total: number;
};
declare namespace ExpandoNested {
    var also: number;
}
declare function ExpandoMerge(n: number): number;
declare namespace ExpandoMerge {
    var p1: number;
}
declare namespace ExpandoMerge {
    var p2: number;
}
declare namespace ExpandoMerge {
    var p3: number;
}
declare var n: number;
declare namespace Ns {
    function ExpandoNamespace(): void;
    namespace ExpandoNamespace {
        var p6: number;
    }
    export function foo(): typeof ExpandoNamespace;
    export {};
}
declare var ExpandoExpr2: (n: number) => string;
declare var n: number;
declare class ExpandoClass {
    n: number;
}
declare var n: number;
declare var ExpandoExpr3: {
    new (): {
        n: number;
    };
};
declare var n: number;
