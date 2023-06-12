//// [tests/cases/conformance/salsa/typeFromPropertyAssignment39.ts] ////

//// [a.js]
const foo = {};
foo["baz"] = {};
foo["baz"]["blah"] = 3;




//// [a.d.ts]
declare namespace foo {
    namespace baz {
        let blah: number;
    }
}
