//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames10_ES6.ts] ////

//// [computedPropertyNames10_ES6.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s](): void { },
    [n](): void { },
    [s + s](): void { },
    [s + n](): void { },
    [+s](): void { },
    [""](): void { },
    [0](): void { },
    [a](): void { },
    [<any>true](): void { },
    [`hello bye`](): void { },
    [`hello ${a} bye`](): void { }
}

/// [Declarations] ////



//// [computedPropertyNames10_ES6.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare var v: {
    [x: string]: () => void;
    [x: number]: () => void;
    ""(): void;
    0(): void;
    "hello bye"(): void;
};
