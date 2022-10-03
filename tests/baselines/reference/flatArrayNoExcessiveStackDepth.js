//// [flatArrayNoExcessiveStackDepth.ts]
// Repro from #43493

declare const foo: unknown[];
const bar = foo.flatMap(bar => bar as Foo);

interface Foo extends Array<string> {}

// Repros from comments in #43249

const repro_43249 = (value: unknown) => {
    if (typeof value !== "string") {
        throw new Error("No");
    }
    const match = value.match(/anything/) || [];
    const [, extracted] = match;
};

function f<Arr, D extends number>(x: FlatArray<Arr, any>, y: FlatArray<Arr, D>) {
    x = y;
    y = x;  // Error
}


//// [flatArrayNoExcessiveStackDepth.js]
"use strict";
// Repro from #43493
const bar = foo.flatMap(bar => bar);
// Repros from comments in #43249
const repro_43249 = (value) => {
    if (typeof value !== "string") {
        throw new Error("No");
    }
    const match = value.match(/anything/) || [];
    const [, extracted] = match;
};
function f(x, y) {
    x = y;
    y = x; // Error
}


//// [flatArrayNoExcessiveStackDepth.d.ts]
declare const foo: unknown[];
declare const bar: string[];
interface Foo extends Array<string> {
}
declare const repro_43249: (value: unknown) => void;
declare function f<Arr, D extends number>(x: FlatArray<Arr, any>, y: FlatArray<Arr, D>): void;
