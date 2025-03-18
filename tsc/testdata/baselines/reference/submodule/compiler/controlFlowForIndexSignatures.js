//// [tests/cases/compiler/controlFlowForIndexSignatures.ts] ////

//// [controlFlowForIndexSignatures.ts]
type Foo = { bar: string };
const boo: Foo = { bar: 'bar' };

function a(aboo1?: Foo) {
    if (!aboo1) return;
    const aboo2: { [key: string]: typeof aboo1.bar } = boo;
}

declare let b: Foo | undefined;
if (b) {
    const bboo: { [key: string]: typeof b.bar } = boo;
}
b = boo;
const bboo: { [key: string]: typeof b.bar } = boo;

declare let c: string | number;
if (typeof c === 'string') {
    type C = { [key: string]: typeof c };
    const boo1: C = { bar: 'works' };
    const boo2: C = { bar: 1 }; // should error
}


//// [controlFlowForIndexSignatures.js]
const boo = { bar: 'bar' };
function a(aboo1) {
    if (!aboo1)
        return;
    const aboo2 = boo;
}
if (b) {
    const bboo = boo;
}
b = boo;
const bboo = boo;
if (typeof c === 'string') {
    const boo1 = { bar: 'works' };
    const boo2 = { bar: 1 };
}
