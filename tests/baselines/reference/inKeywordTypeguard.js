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

class AOpt { a?: string }
class BOpn { b?: string }

function positiveTestClassesWithOptionalProperties(x: AOpt | BOpn) {
    if ("a" in x) {
        x.a = "1";
    } else {
        x.b = "1";
    }
}

class AWithMethod {
    a(): string { return "" }
}

class BWithMethod {
    b(): string { return "" }
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

class C { a: string }
class D { a: string }

function negativeMultipleClassesTest(x: A | B | C | D) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

class ClassWithProp { prop: A | B }

function negativePropTest(x: ClassWithProp) {
    if ("a" in x.prop) {
        let y: string = x.prop.b;
    } else {
        let z: string = x.prop.a;
    }
}

class NegativeClassTest {
    protected prop: A | B;
    inThis() {
        if ('a' in this.prop) {
            let z: number = this.prop.b;
        } else {
            let y: string = this.prop.a;
        }
    }
}

class UnreachableCodeDetection {
    a: string;
    inThis() {
        if ('a' in this) {
        } else {
            let y = this.a;
        }
    }
}

//// [inKeywordTypeguard.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
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
var AOpt = (function () {
    function AOpt() {
    }
    return AOpt;
}());
var BOpn = (function () {
    function BOpn() {
    }
    return BOpn;
}());
function positiveTestClassesWithOptionalProperties(x) {
    if ("a" in x) {
        x.a = "1";
    }
    else {
        x.b = "1";
    }
}
var AWithMethod = (function () {
    function AWithMethod() {
    }
    AWithMethod.prototype.a = function () { return ""; };
    return AWithMethod;
}());
var BWithMethod = (function () {
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
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
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
var ClassWithProp = (function () {
    function ClassWithProp() {
    }
    return ClassWithProp;
}());
function negativePropTest(x) {
    if ("a" in x.prop) {
        var y = x.prop.b;
    }
    else {
        var z = x.prop.a;
    }
}
var NegativeClassTest = (function () {
    function NegativeClassTest() {
    }
    NegativeClassTest.prototype.inThis = function () {
        if ('a' in this.prop) {
            var z = this.prop.b;
        }
        else {
            var y = this.prop.a;
        }
    };
    return NegativeClassTest;
}());
var UnreachableCodeDetection = (function () {
    function UnreachableCodeDetection() {
    }
    UnreachableCodeDetection.prototype.inThis = function () {
        if ('a' in this) {
        }
        else {
            var y = this.a;
        }
    };
    return UnreachableCodeDetection;
}());
