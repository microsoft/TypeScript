//// [tests/cases/conformance/types/thisType/unionThisTypeInFunctions.ts] ////

//// [unionThisTypeInFunctions.ts]
interface Real {
    method(this: this, n: number): void;
    data: string;
}
interface Fake {
    method(this: this, n: number): void;
    data: number;
}
function test(r: Real | Fake) {
    r.method(12); // error
}


//// [unionThisTypeInFunctions.js]
function test(r) {
    r.method(12); // error
}
