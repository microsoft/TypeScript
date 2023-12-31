// @strict: true
// @noEmit: true
// @target: esnext

function action(f: Function) {}

// Narrowings are preserved in closures created past last assignment

function f1(x: string | number) {
    x = "abc";
    action(() => { x /* string | number */ });
    x = 42;
    action(() => { x /* number */ });
}

// Narrowings are not preserved in inner function and class declarations (due to hoisting)

function f2() {
    let x: string | number;
    x = 42;
    let a = () => { x /* number */ };
    let f = function() { x /* number */ };
    let C = class {
        foo() { x /* number */ }
    };
    let o = {
        foo() { x /* number */ }
    };
    function g() { x /* string | number */ }
    class A {
        foo() { x /* string | number */ }
    }
}

// Narrowings are not preserved when assignments occur in inner functions

function f3(x: string | number) {
    action(() => { x = "abc" });
    x = 42;
    action(() => { x /* string | number */ });
}

// Assignment effects in compoud statements extend to the entire statement

function f4(cond: () => boolean) {
    let x: string | number = 0;
    while (cond()) {
        x = "abc";
        action(() => { x /* string | number */ });
        x = 42;
        action(() => { x /* string | number */ });
    }
    action(() => { x /* number */ });
}

function f5(x: string | number, cond: () => boolean) {
    if (cond()) {
        x = 1;
        action(() => { x /* string | number */ });
    }
    else {
        x = 2;
        action(() => { x /* string | number */ });
    }
    action(() => { x /* number */ });
}

// Implicit any variables have a known type following last assignment

function f6() {
    let x;
    x = "abc";
    action(() => { x });  // Error
    x = 42;
    action(() => { x /* number */ });
}

// Narrowings on catch variables are preserved past last assignment

function f7() {
    try {
    }
    catch (e) {
        if (e instanceof Error) {
            let f = () => { e /* Error */ }
        }
    }
}

// Repros from #35124

function f10() {
    let i: number | undefined;
    i = 0;
    return (k: number) => k === i + 1;
}

function makeAdder(n?: number) {
    n ??= 0;
    return (m: number) => n + m;
}

function f11() {
    let r;
    r = "b";
    () => r;
}

// Repro from #52104

const fooMap: Map<string,Array<number>> = new Map()
const values = [1, 2, 3, 4, 5];
let foo = fooMap.get("a");
if (foo == null) {
    foo = [];
}
values.forEach(v => foo.push(v));
