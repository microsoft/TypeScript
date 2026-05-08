//// [tests/cases/conformance/salsa/typeFromPropertyAssignment39.ts] ////

//// [a.js]
const foo = {};
foo["baz"] = {};
foo["baz"]["blah"] = 3;




//// [a.d.ts]
declare const foo: {
    baz: {
        blah: number;
    };
};
