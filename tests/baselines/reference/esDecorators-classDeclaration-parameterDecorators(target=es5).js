//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-parameterDecorators.ts] ////

//// [esDecorators-classDeclaration-parameterDecorators.ts]
declare let dec: any;

class C {
    constructor(@dec x: any) {}
    method(@dec x: any) {}
    set x(@dec x: any) {}
    static method(@dec x: any) {}
    static set x(@dec x: any) {}
}

(class C {
    constructor(@dec x: any) {}
    method(@dec x: any) {}
    set x(@dec x: any) {}
    static method(@dec x: any) {}
    static set x(@dec x: any) {}
});

//// [esDecorators-classDeclaration-parameterDecorators.js]
var C = /** @class */ (function () {
    function C(x) {
    }
    C.prototype.method = function (x) { };
    Object.defineProperty(C.prototype, "x", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    C.method = function (x) { };
    Object.defineProperty(C, "x", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
(/** @class */ (function () {
    function C(x) {
    }
    C.prototype.method = function (x) { };
    Object.defineProperty(C.prototype, "x", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    C.method = function (x) { };
    Object.defineProperty(C, "x", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C;
}()));
