//// [tests/cases/conformance/controlFlow/controlFlowIIFE2.ts] ////

//// [controlFlowIIFE2.ts]
// #30625
declare const x: string | undefined;
declare const y: { z: string | undefined };
function needsString(it: string) {
    return it;
}

function a() {
    if (!x) {
        throw new Error("Missing x");
    }
    const res1 = (() => needsString(x))();
    const res2 = (async () => needsString(x))();

    if (!y.z) {
        throw new Error("Missing z.");
    }

    const res3 = (() => needsString(y.z))();
    const res4 = (async () => needsString(y.z))(); // should not error
}

// #38929
class MyClass {
    public foo: number;

    constructor() {
        this.foo = 0;
        (async () => this.foo + 5)(); // should not error
    }
}

async function f1() {
    let x: string | undefined;
    let y: string | undefined;
    (async () => {
        x = "";
        await 2;
        y = "";
    })();
    x.toLowerCase(); // ideally should not error, but unfortunately does
    y.toLowerCase(); // should error
}

async function f2() {
    let x: string | undefined;
    await (async () => {
        x = "";
    })();
    x.toLowerCase(); // should not error
}

async function f3() {
    let x: string | undefined;
    await (async () => {
        x = "";
    })();
    x.toLowerCase(); // should not error
}

async function f4() {
    let x = "";
    (() => {
        throw new Error("");
    })();
    x.toLowerCase(); // should error. unreachable
}

async function f5() {
    let x = "";
    await (async () => {
        throw new Error("");
    })();
    x.toLowerCase(); // should error. unreachable
}


//// [controlFlowIIFE2.js]
function needsString(it) {
    return it;
}
function a() {
    if (!x) {
        throw new Error("Missing x");
    }
    const res1 = (() => needsString(x))();
    const res2 = (async () => needsString(x))();
    if (!y.z) {
        throw new Error("Missing z.");
    }
    const res3 = (() => needsString(y.z))();
    const res4 = (async () => needsString(y.z))(); // should not error
}
// #38929
class MyClass {
    foo;
    constructor() {
        this.foo = 0;
        (async () => this.foo + 5)(); // should not error
    }
}
async function f1() {
    let x;
    let y;
    (async () => {
        x = "";
        await 2;
        y = "";
    })();
    x.toLowerCase(); // ideally should not error, but unfortunately does
    y.toLowerCase(); // should error
}
async function f2() {
    let x;
    await (async () => {
        x = "";
    })();
    x.toLowerCase(); // should not error
}
async function f3() {
    let x;
    await (async () => {
        x = "";
    })();
    x.toLowerCase(); // should not error
}
async function f4() {
    let x = "";
    (() => {
        throw new Error("");
    })();
    x.toLowerCase(); // should error. unreachable
}
async function f5() {
    let x = "";
    await (async () => {
        throw new Error("");
    })();
    x.toLowerCase(); // should error. unreachable
}
