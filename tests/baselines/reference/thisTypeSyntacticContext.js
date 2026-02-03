//// [tests/cases/conformance/types/thisType/thisTypeSyntacticContext.ts] ////

//// [thisTypeSyntacticContext.ts]
function f(this: { n: number }) {
}

const o: { n: number, test?: (this: { n: number }) => void } = { n: 1 }
o.test = f

o.test();
o!.test();
o.test!();
o.test!!!();
(o.test!)();
(o.test)();



//// [thisTypeSyntacticContext.js]
function f() {
}
var o = { n: 1 };
o.test = f;
o.test();
o.test();
o.test();
o.test();
(o.test)();
(o.test)();
