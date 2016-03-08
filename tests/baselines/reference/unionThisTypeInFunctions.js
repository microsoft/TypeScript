//// [unionThisTypeInFunctions.ts]
interface Real {
    method(n: number): void;
    data: string;
}
interface Fake {
    method(n: number): void;
    data: number;
}
function test(r: Real | Fake) {
    r.method(12);
}


//// [unionThisTypeInFunctions.js]
function test(r) {
    r.method(12);
}
