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

function f5a(cond: boolean) {
    if (cond) {
        let x: number | undefined;
        x = 1;
        action(() => { x /* number */ });
    }
    else {
        let x: number | undefined;
        x = 2;
        action(() => { x /* number */ });
    }
}

function f5b() {
    for (let x = 0; x < 10; x++) {
        if (x === 1 || x === 2) {
            action(() => { x /* 1 | 2 */ })
        }
    }
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

// Narrowings are not preserved for global variables

let g: string | number;
g = "abc";
action(() => { g /* string | number */ });

// Narrowings are not preserved for exported namespace members

namespace Foo {
    export let x: string | number;
    x = "abc";
    action(() => { x /* string | number */ });
    let y: string | number;
    y = "abc";
    action(() => { y /* string */ });
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

function f12() {
    const fooMap: Map<string,Array<number>> = new Map()
    const values = [1, 2, 3, 4, 5];
    let foo = fooMap.get("a");
    if (foo == null) {
        foo = [];
    }
    values.forEach(v => foo.push(v));
}

function f13() {
    // Test for captured 'var' declaration (as opposed to parameters, let, const).
    var foo: string | undefined;
    foo = '';

    return () => {
        foo.toLocaleLowerCase();
    }
}