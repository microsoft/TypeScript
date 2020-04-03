//// [inKeywordTypeguard.ts]
class A { a: string; }
class B { b: string; }

function negativeClassesTest(x: A | B) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

function positiveClassesTest(x: A | B) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

class AWithOptionalProp { a?: string; }
class BWithOptionalProp { b?: string; }

function positiveTestClassesWithOptionalProperties(x: AWithOptionalProp | BWithOptionalProp) {
    if ("a" in x) {
        x.a = "1";
    } else {
        x.b = "1";
    }
}

class AWithMethod {
    a(): string { return ""; }
}

class BWithMethod {
    b(): string { return ""; }
}

function negativeTestClassesWithMembers(x: AWithMethod | BWithMethod) {
    if ("a" in x) {
        x.a();
        x.b();
    } else {
    }
}

function negativeTestClassesWithMemberMissingInBothClasses(x: AWithMethod | BWithMethod) {
    if ("c" in x) {
        x.a();
        x.b();
    } else {
        x.a();
        x.b();
    }
}

class C { a: string; }
class D { a: string; }

function negativeMultipleClassesTest(x: A | B | C | D) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

class ClassWithUnionProp { prop: A | B }

function negativePropTest(x: ClassWithUnionProp) {
    if ("a" in x.prop) {
        let y: string = x.prop.b;
    } else {
        let z: string = x.prop.a;
    }
}

class NegativeClassTest {
    protected prop: A | B;
    inThis() {
        if ("a" in this.prop) {
            let z: number = this.prop.b;
        } else {
            let y: string = this.prop.a;
        }
    }
}

class UnreachableCodeDetection {
    a: string;
    inThis() {
        if ("a" in this) {
        } else {
            let y = this.a;
        }
    }
}

function positiveIntersectionTest(x: { a: string } & { b: string }) {
    if ("a" in x) {
        let s: string = x.a;
    } else {
        let n: never = x;
    }
}


//// [inKeywordTypeguard.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function negativeClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
function positiveClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
var AWithOptionalProp = /** @class */ (function () {
    function AWithOptionalProp() {
    }
    return AWithOptionalProp;
}());
var BWithOptionalProp = /** @class */ (function () {
    function BWithOptionalProp() {
    }
    return BWithOptionalProp;
}());
function positiveTestClassesWithOptionalProperties(x) {
    if ("a" in x) {
        x.a = "1";
    }
    else {
        x.b = "1";
    }
}
var AWithMethod = /** @class */ (function () {
    function AWithMethod() {
    }
    AWithMethod.prototype.a = function () { return ""; };
    return AWithMethod;
}());
var BWithMethod = /** @class */ (function () {
    function BWithMethod() {
    }
    BWithMethod.prototype.b = function () { return ""; };
    return BWithMethod;
}());
function negativeTestClassesWithMembers(x) {
    if ("a" in x) {
        x.a();
        x.b();
    }
    else {
    }
}
function negativeTestClassesWithMemberMissingInBothClasses(x) {
    if ("c" in x) {
        x.a();
        x.b();
    }
    else {
        x.a();
        x.b();
    }
}
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
function negativeMultipleClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
var ClassWithUnionProp = /** @class */ (function () {
    function ClassWithUnionProp() {
    }
    return ClassWithUnionProp;
}());
function negativePropTest(x) {
    if ("a" in x.prop) {
        var y = x.prop.b;
    }
    else {
        var z = x.prop.a;
    }
}
var NegativeClassTest = /** @class */ (function () {
    function NegativeClassTest() {
    }
    NegativeClassTest.prototype.inThis = function () {
        if ("a" in this.prop) {
            var z = this.prop.b;
        }
        else {
            var y = this.prop.a;
        }
    };
    return NegativeClassTest;
}());
var UnreachableCodeDetection = /** @class */ (function () {
    function UnreachableCodeDetection() {
    }
    UnreachableCodeDetection.prototype.inThis = function () {
        if ("a" in this) {
        }
        else {
            var y = this.a;
        }
    };
    return UnreachableCodeDetection;
}());
function positiveIntersectionTest(x) {
    if ("a" in x) {
        var s = x.a;
    }
    else {
        var n = x;
    }
}
