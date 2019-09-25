// @strict: true
// @allowUnreachableCode: false
// @declaration: true

function fail(message?: string): never {
    throw new Error(message);
}

function f01(x: string | undefined) {
    if (x === undefined) fail("undefined argument");
    x.length;  // string
}

function f02(x: number): number {
    if (x >= 0) return x;
    fail("negative number");
    x;  // Unreachable
}

function f03(x: string) {
    x;  // string
    fail();
    x;  // Unreachable
}

function f11(x: string | undefined, fail: (message?: string) => never) {
    if (x === undefined) fail("undefined argument");
    x.length;  // string
}

function f12(x: number, fail: (message?: string) => never): number {
    if (x >= 0) return x;
    fail("negative number");
    x;  // Unreachable
}

function f13(x: string, fail: (message?: string) => never) {
    x;  // string
    fail();
    x;  // Unreachable
}

namespace Debug {
    export declare function fail(message?: string): never;
}

function f21(x: string | undefined) {
    if (x === undefined) Debug.fail("undefined argument");
    x.length;  // string
}

function f22(x: number): number {
    if (x >= 0) return x;
    Debug.fail("negative number");
    x;  // Unreachable
}

function f23(x: string) {
    x;  // string
    Debug.fail();
    x;  // Unreachable
}

function f24(x: string) {
    x;  // string
    ((Debug).fail)();
    x;  // Unreachable
}

class Test {
    fail(message?: string): never {
        throw new Error(message);
    }
    f1(x: string | undefined) {
        if (x === undefined) this.fail("undefined argument");
        x.length;  // string
    }
    f2(x: number): number {
        if (x >= 0) return x;
        this.fail("negative number");
        x;  // Unreachable
    }
    f3(x: string) {
        x;  // string
        this.fail();
        x;  // Unreachable
    }
}

function f30(x: string | number | undefined) {
    if (typeof x === "string") {
        fail();
        x;  // Unreachable
    }
    else {
        x;  // number | undefined
        if (x !== undefined) {
            x;  // number
            fail();
            x;  // Unreachable
        }
        else {
            x;  // undefined
            fail();
            x;  // Unreachable
        }
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f31(x: { a: string | number }) {
    if (typeof x.a === "string") {
        fail();
        x;    // Unreachable
        x.a;  // Unreachable
    }
    x;    // { a: string | number }
    x.a;  // number
}

function f40(x: number) {
    try {
        x;
        fail();
        x;  // Unreachable
    }
    finally {
        x;
        fail();
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f41(x: number) {
    try {
        x;
    }
    finally {
        x;
        fail();
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f42(x: number) {
    try {
        x;
        fail();
        x;  // Unreachable
    }
    finally {
        x;
    }
    x;  // Unreachable
}
