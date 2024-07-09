// @module: es2020
// @target: es2020
// @filename: 0.ts
export class B {
    print() { return "I am B"}
}

// @filename: 2.ts
function foo(x: Promise<any>) {
    x.then(value => {
        let b = new value.B();
        b.print();
    })
}

foo(import("./0"));
