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
ExpandoExpr.prop = 2
ExpandoExpr.m = function(n: number) {
    return n + 1;
}
var n = ExpandoExpr.prop + ExpandoExpr.m(12) + ExpandoExpr(101).length

const ExpandoArrow = (n: number) => n.toString();
ExpandoArrow.prop = 2
ExpandoArrow.m = function(n: number) {
    return n + 1;

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
ExpandoExpr.prop = 2;
ExpandoExpr.m = function (n) {
    return n + 1;
};
var n = ExpandoExpr.prop + ExpandoExpr.m(12) + ExpandoExpr(101).length;
var ExpandoArrow = function (n) { return n.toString(); };
ExpandoArrow.prop = 2;
ExpandoArrow.m = function (n) {
    return n + 1;
};
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
