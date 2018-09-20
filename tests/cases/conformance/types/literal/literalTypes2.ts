enum E {
    A, B, C
}

let cond: boolean;

function f1(p1 = 1, p2 = "abc", p3 = true, p4 = E.A) {
    var v1 = 1;
    var v2 = -123;
    var v3 = 3 + 4;
    var v4 = "abc";
    var v5 = "";
    var v6 = "abc" + "def";
    var v7 = true;
    var v8 = E.A;
    let x1 = 1;
    let x2 = -123;
    let x3 = 3 + 4;
    let x4 = "abc";
    let x5 = "";
    let x6 = "abc" + "def";
    let x7 = true;
    var x8 = E.A;
    const c1 = 1;
    const c2 = -123;
    const c3 = 3 + 4;
    const c4 = "abc";
    const c5 = "";
    const c6 = "abc" + "def";
    const c7 = true;
    const c8 = E.A;
}

function f2(p1: 1 = 1, p2: "abc" = "abc", p3: true = true, p4: E.A = E.A) {
    var v1: 1 = 1;
    var v2: -123 = -123;
    var v3: "abc" = "abc";
    var v4: true = true;
    var v5: E.A = E.A;
    let x1: 1 = 1;
    let x2: -123 = -123;
    let x3: "abc" = "abc";
    let x4: true = true;
    let x5: E.A = E.A;
}

function f3() {
    const c1 = cond ? 1 : 2;
    const c2 = cond ? 1 : "two";
    const c3 = cond ? E.A : cond ? true : 123;
    const c4 = cond ? "abc" : null;
    const c5 = cond ? 456 : undefined;
    const c6: { kind: 123 } = { kind: 123 };
    const c7: [1 | 2, "foo" | "bar"] = [1, "bar"];
    const c8 = cond ? c6 : cond ? c7 : "hello";
    let x1 = c1;
    let x2 = c2;
    let x3 = c3;
    let x4 = c4;
    let x5 = c5;
    let x6 = c6;
    let x7 = c7;
    let x8 = c8;
}

class C1 {
    x1 = 1;
    x2 = -123;
    x3 = 3 + 4;
    x4 = "abc";
    x5 = "";
    x6 = "abc" + "def";
    x7 = true;
    x8 = E.A;
    readonly c1 = 1;
    readonly c2 = -123;
    readonly c3 = 3 + 4;
    readonly c4 = "abc";
    readonly c5 = "";
    readonly c6 = "abc" + "def";
    readonly c7 = true;
    readonly c8 = E.A;
}

function f4() {
    const c1 = { a: 1, b: "foo" };
    const c2: { a : 0 | 1, b: "foo" | "bar" } = { a: 1, b: "foo" };
    let x1 = { a: 1, b: "foo" };
    let x2: { a : 0 | 1, b: "foo" | "bar" } = { a: 1, b: "foo" };
}

function f5() {
    const c1 = [1, "foo"];
    const c2: (1 | "foo")[] = [1, "foo"];
    const c3: [1, "foo"] = [1, "foo"];
    let x1 = [1, "foo"];
    let x2: (1 | "foo")[] = [1, "foo"];
    let x3: [1, "foo"] = [1, "foo"];
}

function f6() {
    const { c1 = true, c2 = 0, c3 = "foo" } = { c1: false, c2: 1, c3: "bar" };
    let { x1 = true, x2 = 0, x3 = "foo" } = { x1: false, x2: 1, x3: "bar" };
}

function f10() {
    return "hello";
}

function f11() {
    return cond ? 1 : "two";
}

function f12() {
    if (cond) {
        return 1;
    }
    else {
        return "two";
    }
}

class C2 {
    foo() {
        return 0;
    }
    bar() {
        return cond ? 0 : 1;
    }
}

function f20() {
    const f1 = () => 0;
    const f2 = () => "hello";
    const f3 = () => true;
    const f4 = () => E.C;
    const f5 = (): "foo" => "foo";
    const f6: () => "foo" | "bar" = () => "bar";
    const f7: (() => "foo") | (() => "bar") = () => "bar";
}

declare function g1<T>(x: T): T;
declare function g2<T>(x: T, y: T): T;
declare function g3<T, U>(x: T, y: U): T | U;
declare function g4<T>(x: T): T[];
declare function g5<T extends number>(x: T, y: T): T[];
declare function g6<T>(x: T[]): T;
declare function g7<T>(x: T[]): T[];
declare function g8<T>(x: T, f: (p: T) => T): T;

const a: (1 | 2)[] = [1, 2];

const x1 = g1(1);  // Type 1
const x2 = g2(1, 1);  // Type 1
const x3 = g2(1, 2);  // Type 1 | 2
const x4 = g3(1, "two");  // Type 1 | "two"
const x5 = g4(1);  // Type number[]
const x6 = g5(1, 2);  // Type (1 | 2)[]
const x7 = g6([1, 2]);  // Type number
const x8 = g6(a);  // Type 1 | 2
const x9 = g7(a);  // Type (1 | 2)[]
const x10 = g8(1, x => x);  // Type number
const x11 = g8(1, x => x + 1);  // Type number

function makeArray<T>(x: T): T[] {
    return [x];
}

function append<T>(a: T[], x: T): T[] {
    let result = a.slice();
    result.push(x);
    return result;
}

type Bit = 0 | 1;

let aa = makeArray<Bit>(0);
aa = append(aa, 1);
