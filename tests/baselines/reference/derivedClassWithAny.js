//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassWithAny.ts] ////

//// [derivedClassWithAny.ts]
class C {
    x: number;
    get X(): number { return 1; }
    foo(): number {
        return 1;
    }

    static y: number;
    static get Y(): number {
        return 1;
    }
    static bar(): number {
        return 1;
    }
}

class D extends C {
    x: any;
    get X(): any {
        return null;
    }
    foo(): any {
        return 1;
    }

    static y: any;
    static get Y(): any {
        return null;
    }
    static bar(): any {
        return null;
    }
}

// if D is a valid class definition than E is now not safe tranisitively through C
class E extends D {
    x: string;
    get X(): string{ return ''; }
    foo(): string {
        return '';
    }

    static y: string;
    static get Y(): string {
        return '';
    }
    static bar(): string {
        return '';
    }
}

var c: C;
var d: D;
var e: E;

c = d;
c = e;
var r = c.foo(); // e.foo would return string


//// [derivedClassWithAny.js]
class C {
    x;
    get X() { return 1; }
    foo() {
        return 1;
    }
    static y;
    static get Y() {
        return 1;
    }
    static bar() {
        return 1;
    }
}
class D extends C {
    x;
    get X() {
        return null;
    }
    foo() {
        return 1;
    }
    static y;
    static get Y() {
        return null;
    }
    static bar() {
        return null;
    }
}
// if D is a valid class definition than E is now not safe tranisitively through C
class E extends D {
    x;
    get X() { return ''; }
    foo() {
        return '';
    }
    static y;
    static get Y() {
        return '';
    }
    static bar() {
        return '';
    }
}
var c;
var d;
var e;
c = d;
c = e;
var r = c.foo(); // e.foo would return string
