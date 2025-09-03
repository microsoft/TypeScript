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
class A {
    a;
}
class B {
    b;
}
class C {
    b;
}
class D {
    a;
}
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
        let y = x.a;
    }
    else {
        let z = x.b;
    }
}
function anonymousClasses(x) {
    if ("a" in x) {
        let y = x.a;
    }
    else {
        let z = x.b;
    }
}
class AWithOptionalProp {
    a;
}
class BWithOptionalProp {
    b;
}
function positiveTestClassesWithOptionalProperties(x) {
    if ("a" in x) {
        x.a = "1";
    }
    else {
        const y = x instanceof AWithOptionalProp
            ? x.a
            : x.b;
    }
}
function inParenthesizedExpression(x) {
    if ("a" in (x)) {
        let y = x.a;
    }
    else {
        let z = x.b;
    }
}
class ClassWithUnionProp {
    prop;
}
function inProperty(x) {
    if ("a" in x.prop) {
        let y = x.prop.a;
    }
    else {
        let z = x.prop.b;
    }
}
class NestedClassWithProp {
    outer;
}
function innestedProperty(x) {
    if ("a" in x.outer.prop) {
        let y = x.outer.prop.a;
    }
    else {
        let z = x.outer.prop.b;
    }
}
class InMemberOfClass {
    prop;
    inThis() {
        if ("a" in this.prop) {
            let y = this.prop.a;
        }
        else {
            let z = this.prop.b;
        }
    }
}
// added for completeness
class SelfAssert {
    a;
    inThis() {
        if ("a" in this) {
            let y = this.a;
        }
        else {
        }
    }
}
function f(i) {
    if ("a" in i) {
        return i.a;
    }
    else if ("b" in i) {
        return i.b;
    }
    return "c" in i && i.c;
}
