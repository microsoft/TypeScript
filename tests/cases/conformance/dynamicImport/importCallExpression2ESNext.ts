// @module: esnext
// @target: esnext
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