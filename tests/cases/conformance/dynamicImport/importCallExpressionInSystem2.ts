// @module: system
// @target: esnext
// @filename: 0.ts
export class B {
    print() { return "I am B"}
}

// @filename: 2.ts
// We use Promise<any> for now as there is no way to specify shape of module object
function foo(x: Promise<any>) {
    x.then(value => {
        let b = new value.B();
        b.print();
    })
}

foo(import("./0"));