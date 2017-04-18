//// [typeGuardOfFromPropNameInUnionType.ts]
class A { a: string; }
class B { b: number; }
class C { b: Object; }
class D { a: Date; }
class ClassWithProp { prop: A | B }
class NestedClassWithProp { outer: ClassWithProp }

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
function inParenthesizedExpression(x: A | B) {
    if ("a" in (x)) {
        let y: string = x.a;
    } else {
        let z: number = x.b;
    }
}


function inProperty(x: ClassWithProp) {
    if ("a" in x.prop) {
        let y: string = x.prop.a;
    } else {
        let z: number = x.prop.b;
    }
}


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
        if ('a' in this.prop) {
            let y: string = this.prop.a;
        } else {
            let z: number = this.prop.b;
        }
    }
}

//added for completeness
class SelfAssert {
    a: string;
    inThis() {
        if ('a' in this) {
            let y: string = this.a;
        } else {
        }
    }
}

//// [typeGuardOfFromPropNameInUnionType.js]
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
var ClassWithProp = (function () {
    function ClassWithProp() {
    }
    return ClassWithProp;
}());
var NestedClassWithProp = (function () {
    function NestedClassWithProp() {
    }
    return NestedClassWithProp;
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
function inParenthesizedExpression(x) {
    if ("a" in (x)) {
        var y = x.a;
    }
    else {
        var z = x.b;
    }
}
function inProperty(x) {
    if ("a" in x.prop) {
        var y = x.prop.a;
    }
    else {
        var z = x.prop.b;
    }
}
function innestedProperty(x) {
    if ("a" in x.outer.prop) {
        var y = x.outer.prop.a;
    }
    else {
        var z = x.outer.prop.b;
    }
}
var InMemberOfClass = (function () {
    function InMemberOfClass() {
    }
    InMemberOfClass.prototype.inThis = function () {
        if ('a' in this.prop) {
            var y = this.prop.a;
        }
        else {
            var z = this.prop.b;
        }
    };
    return InMemberOfClass;
}());
//added for completeness
var SelfAssert = (function () {
    function SelfAssert() {
    }
    SelfAssert.prototype.inThis = function () {
        if ('a' in this) {
            var y = this.a;
        }
        else {
        }
    };
    return SelfAssert;
}());
