//// [tests/cases/conformance/types/import/importTypeInJSDoc.ts] ////

//// [externs.d.ts]
declare namespace MyClass {
    export interface Bar {
        doer: (x: string) => void;
    }
}
declare class MyClass {
    field: string;
    static Bar: (x: string, y?: number) => void;
    constructor(x: MyClass.Bar);
}
declare global {
    const Foo: typeof MyClass;
}
export = MyClass;
//// [index.js]
/**
 * @typedef {import("./externs")} Foo
 */

let a = /** @type {Foo} */(/** @type {*} */(undefined)); 
a = new Foo({doer: Foo.Bar});
const q = /** @type {import("./externs").Bar} */({ doer: q => q });
const r = /** @type {typeof import("./externs").Bar} */(r => r);


//// [index.js]
/**
 * @typedef {import("./externs")} Foo
 */
let a = /** @type {Foo} */ ( /** @type {*} */(undefined));
a = new Foo({ doer: Foo.Bar });
const q = /** @type {import("./externs").Bar} */ ({ doer: q => q });
const r = /** @type {typeof import("./externs").Bar} */ (r => r);
