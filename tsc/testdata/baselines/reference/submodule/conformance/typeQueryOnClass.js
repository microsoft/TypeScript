//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeQueryOnClass.ts] ////

//// [typeQueryOnClass.ts]
class C<T> {
    constructor(x: number);
    constructor(x: string);
    constructor(public x) { }

    static foo(x: number);
    static foo(x: {});
    static foo(x) { }

    static bar(x) { }

    static sa = 1;
    static sb = () => 1;

    static get sc() {
        return 1;
    }
    static set sc(x) {
    }

    static get sd() {
        return 1;
    }

    baz(x): string { return ''; }

    ia = 1;
    ib = () => this.ia;

    get ic() {
        return 1;
    }
    set ic(x) {
    }

    get id() {
        return 1;
    }

}

var c: C<string>;

// BUG 820454
var r1: typeof C;
var r2: typeof c;

class D<T> {
    constructor(public y?) { }
    x: T;
    foo() { }
}

var d: D<string>;
var r3: typeof D;
var r4: typeof d;

//// [typeQueryOnClass.js]
class C {
    x;
    constructor(x) {
        this.x = x;
    }
    static foo(x) { }
    static bar(x) { }
    static sa = 1;
    static sb = () => 1;
    static get sc() {
        return 1;
    }
    static set sc(x) {
    }
    static get sd() {
        return 1;
    }
    baz(x) { return ''; }
    ia = 1;
    ib = () => this.ia;
    get ic() {
        return 1;
    }
    set ic(x) {
    }
    get id() {
        return 1;
    }
}
var c;
// BUG 820454
var r1;
var r2;
class D {
    y;
    constructor(y) {
        this.y = y;
    }
    x;
    foo() { }
}
var d;
var r3;
var r4;
