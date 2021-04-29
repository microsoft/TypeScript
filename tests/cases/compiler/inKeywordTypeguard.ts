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

// Repro from #38608
declare const error: Error;
if ('extra' in error) {
    error // Still Error
} else {
    error // Error
}

function narrowsToNever(x: { l: number } | { r: number }) {
    let v: number;
    if ("l" in x) {
        v = x.l;
    }
    else if ("r" in x) {
        v = x.r;
    }
    else {
        v = x
    }
    return v;
}

type AOrB = { aProp: number } | { bProp: number };
declare function isAOrB(x: unknown): x is AOrB;

declare var x: unknown;
if (isAOrB(x)) {
    if ("aProp" in x) {
        x.aProp;
    }
    else if ("bProp" in x) {
        x.bProp;
    }
    // x is never because of the type predicate from unknown
    else if ("cProp" in x) {
        const _never: never = x;
    }
}

function negativeIntersectionTest() {
    if ("ontouchstart" in window) {
        window.ontouchstart
    } else {
        window.ontouchstart
    }
}
