//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfactionWithDefaultExport.ts] ////

//// [a.ts]
interface Foo {
    a: number;
}
export default {} satisfies Foo;

//// [b.ts]
interface Foo {
    a: number;
}
export default { a: 1 } satisfies Foo;


//// [a.js]
export default {};
//// [b.js]
export default { a: 1 };
