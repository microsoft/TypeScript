//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFromPropNameInUnionType.ts] ////

//// [typeGuardOfFromPropNameInUnionType.ts]
class A { a: string; }
class B { b: number; }
class C { b: Object; }
class D { a: Date; }

function namedClasses(x: A | B) {
    if ("a" in x) {
        x.a = "1";
    } else {
        x.b = 1;
    }
}

function multipleClasses(x: A | B | C | D) {
    if ("a" in x) {
        let y: string | Date = x.a;
    } else {
        let z: number | Object = x.b;
    }
}

function anonymousClasses(x: { a: string; } | { b: number; }) {
    if ("a" in x) {
        let y: string = x.a;
    } else {
        let z: number = x.b;
    }
}

class AWithOptionalProp { a?: string; }
class BWithOptionalProp { b?: string; }

function positiveTestClassesWithOptionalProperties(x: AWithOptionalProp | BWithOptionalProp) {
    if ("a" in x) {
        x.a = "1";
    } else {
        const y: string = x instanceof AWithOptionalProp
            ? x.a
            : x.b
    }
}

function inParenthesizedExpression(x: A | B) {
    if ("a" in (x)) {
        let y: string = x.a;
    } else {
        let z: number = x.b;
    }
}

class ClassWithUnionProp { prop: A | B; }

function inProperty(x: ClassWithUnionProp) {
    if ("a" in x.prop) {
        let y: string = x.prop.a;
    } else {
        let z: number = x.prop.b;
    }
}

class NestedClassWithProp { outer: ClassWithUnionProp; }

function innestedProperty(x: NestedClassWithProp) {
    if ("a" in x.outer.prop) {
        let y: string = x.outer.prop.a;
    } else {
        let z: number = x.outer.prop.b;
    }
}

class InMemberOfClass {
    protected prop: A | B;
    inThis() {
        if ("a" in this.prop) {
            let y: string = this.prop.a;
        } else {
            let z: number = this.prop.b;
        }
    }
}

// added for completeness
class SelfAssert {
    a: string;
    inThis() {
        if ("a" in this) {
            let y: string = this.a;
        } else {
        }
    }
}

interface Indexed {
    [s: string]: any;
}

function f(i: Indexed) {
    if ("a" in i) {
        return i.a;
    }
    else if ("b" in i) {
        return i.b;
    }
    return "c" in i && i.c;
}


//// [typeGuardOfFromPropNameInUnionType.js]
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
function namedClasses(x) {
    if ("a" in x) {
        x.a = "1";
    }
    else {
        x.b = 1;
    }
}
function multipleClasses(x) {
    if ("a" in x) {
        var y = x.a;
    }
    else {
        var z = x.b;
    }
}
function anonymousClasses(x) {
    if ("a" in x) {
        var y = x.a;
    }
    else {
        var z = x.b;
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
        var y = x instanceof AWithOptionalProp
            ? x.a
            : x.b;
    }
}
function inParenthesizedExpression(x) {
    if ("a" in (x)) {
        var y = x.a;
    }
    else {
        var z = x.b;
    }
}
var ClassWithUnionProp = /** @class */ (function () {
    function ClassWithUnionProp() {
    }
    return ClassWithUnionProp;
}());
function inProperty(x) {
    if ("a" in x.prop) {
        var y = x.prop.a;
    }
    else {
        var z = x.prop.b;
    }
}
var NestedClassWithProp = /** @class */ (function () {
    function NestedClassWithProp() {
    }
    return NestedClassWithProp;
}());
function innestedProperty(x) {
    if ("a" in x.outer.prop) {
        var y = x.outer.prop.a;
    }
    else {
        var z = x.outer.prop.b;
    }
}
var InMemberOfClass = /** @class */ (function () {
    function InMemberOfClass() {
    }
    InMemberOfClass.prototype.inThis = function () {
        if ("a" in this.prop) {
            var y = this.prop.a;
        }
        else {
            var z = this.prop.b;
        }
    };
    return InMemberOfClass;
}());
// added for completeness
var SelfAssert = /** @class */ (function () {
    function SelfAssert() {
    }
    SelfAssert.prototype.inThis = function () {
        if ("a" in this) {
            var y = this.a;
        }
        else {
        }
    };
    return SelfAssert;
}());
function f(i) {
    if ("a" in i) {
        return i.a;
    }
    else if ("b" in i) {
        return i.b;
    }
    return "c" in i && i.c;
}
