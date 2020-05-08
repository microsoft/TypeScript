//// [tests/cases/conformance/dynamicImport/importCallExpression2ES2020.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
function foo(x: Promise<any>) {
    x.then(value => {
        let b = new value.B();
        b.print();
    })
}

foo(import("./0"));


//// [0.js]
export class B {
    print() { return "I am B"; }
}
//// [2.js]
function foo(x) {
    x.then(value => {
        let b = new value.B();
        b.print();
    });
}
foo(import("./0"));
