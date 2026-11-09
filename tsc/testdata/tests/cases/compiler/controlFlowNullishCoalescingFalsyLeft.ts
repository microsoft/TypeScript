// @strict: true
// @allowUnreachableCode: false
// @target: esnext

declare function c(): boolean;
declare function d(): boolean | undefined;
declare function u(x: undefined): boolean;

// https://github.com/microsoft/TypeScript/issues/65402

function f1() {
    while (c() ?? (c() || true)) {}
    c(); // Reachable
}

function f2(a: "" | undefined, b: boolean) {
    if (a ?? b) {} else {
        const x: undefined = a; // Error
    }
}

// Narrowing of a falsy, non-nullish left operand

function f3(a: boolean | undefined, b: boolean) {
    if (a ?? b) {
        a; // boolean | undefined
    }
    else {
        a; // false | undefined
    }
}

function f4(a: string | number | undefined) {
    if (a ?? (c() || true)) {
        a; // string | number | undefined
    }
    else {
        a; // string | number
    }
}

function f5(a: object | undefined, b: boolean) {
    if (a ?? b) {}
    else {
        a; // undefined
        const r: false = b; // Error, as with `if (a && b)` when `a: object`
    }
}

function f6(o: { p?: number }, b: boolean) {
    if (o.p ?? b) {}
    else {
        o.p; // number | undefined
    }
}

function f7(a: "" | boolean | undefined, b: boolean) {
    if (a ??= b) {
        a; // "" | boolean
    }
    else {
        a; // "" | false
    }
}

// Literal left operands

function f8() {
    while (true ?? (c() || true)) {}
    c(); // Unreachable
}

function f9() {
    while (false ?? (c() || true)) {}
    c(); // Reachable
}

function f10() {
    while (null ?? (c() || true)) {}
    c(); // Unreachable
}

// Logical left operands

function f11() {
    while ((c() || 0) ?? (c() || true)) {}
    c(); // Reachable
}

function f12() {
    while (d() ?? d() ?? (c() || true)) {}
    c(); // Reachable
}

function f13(a: "" | undefined, b: "" | undefined) {
    if (a ?? b ?? u(a)) {
        a; // "" | undefined
    }
    else {
        a; // "" | undefined
        b; // "" | undefined
    }
    const r = a ?? b ?? u(a);
}

function f14(x: boolean, z: 0 | undefined) {
    let y: 0 | 1 | undefined;
    (x || (y = z)) ?? (y = 1);
    y; // 0 | 1 | undefined
}

// Nested in logical expressions

function f15(a: "" | undefined, b: true, d: boolean) {
    if ((a ?? b) || d) {}
    else {
        a; // "" | undefined
    }
}

// Expressions of optional chains only test for nullishness

function f16(a: "" | undefined) {
    let b: 0 | 1 = 0;
    if ((a ?? (b = 1, ""))?.[b = 1]) {}
    else {
        const one: 1 = b;
    }
}

function f17(a: "" | undefined, b: "" | undefined) {
    (a ?? b ?? u(a))?.valueOf();
}

// Parenthesized literal left operands

function f18() {
    while (((true)) ?? (c() || true)) {}
    c(); // Unreachable
}

function f19() {
    while (((null)) ?? (c() || true)) {}
    c(); // Unreachable
}

function f20() {
    while (((false)) ?? (c() || true)) {}
    c(); // Reachable
}

// Optional-chain side effects still occur when nested in another ??

function f21(a: "" | undefined) {
    let b: 0 | 1 = 0;
    (a ?? (b = 1, ""))?.[b = 1] ?? false;
    const one: 1 = b;
}

function f22(a: "" | undefined) {
    let b: 0 | 1 = 0;
    (a ?? (b = 1, ""))?.charAt(b = 1) ?? false;
    const one: 1 = b;
}
