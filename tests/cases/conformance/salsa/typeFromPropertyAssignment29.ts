// @declaration: true
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

