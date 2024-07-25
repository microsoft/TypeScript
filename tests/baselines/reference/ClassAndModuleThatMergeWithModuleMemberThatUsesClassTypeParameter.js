//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.ts] ////

//// [ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.ts]
// all expected to be errors

class clodule1<T>{

    id: string;
    value: T;
}

module clodule1 {
    function f(x: T) { }
}

class clodule2<T>{

    id: string;
    value: T;
}

module clodule2 {
    var x: T;

    class D<U extends T>{
        id: string;
        value: U;
    }
}

class clodule3<T>{

    id: string;
    value: T;
}

module clodule3 {
    export var y = { id: T };
}

class clodule4<T>{

    id: string;
    value: T;
}

module clodule4 {
    class D {
        name: T;
    }
}


//// [ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.js]
// all expected to be errors
var clodule1 = /** @class */ (function () {
    function clodule1() {
    }
    return clodule1;
}());
(function (clodule1) {
    function f(x) { }
})(clodule1 || (clodule1 = {}));
var clodule2 = /** @class */ (function () {
    function clodule2() {
    }
    return clodule2;
}());
(function (clodule2) {
    var x;
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
})(clodule2 || (clodule2 = {}));
var clodule3 = /** @class */ (function () {
    function clodule3() {
    }
    return clodule3;
}());
(function (clodule3) {
    clodule3.y = { id: T };
})(clodule3 || (clodule3 = {}));
var clodule4 = /** @class */ (function () {
    function clodule4() {
    }
    return clodule4;
}());
(function (clodule4) {
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
})(clodule4 || (clodule4 = {}));
