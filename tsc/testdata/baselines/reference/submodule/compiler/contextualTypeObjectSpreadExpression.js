//// [tests/cases/compiler/contextualTypeObjectSpreadExpression.ts] ////

//// [contextualTypeObjectSpreadExpression.ts]
interface I {
    a: "a";
}
let i: I;
i = { ...{ a: "a" } };


//// [contextualTypeObjectSpreadExpression.js]
let i;
i = { ...{ a: "a" } };
