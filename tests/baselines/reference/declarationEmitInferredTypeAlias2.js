//// [tests/cases/compiler/declarationEmitInferredTypeAlias2.ts] ////

//// [0.ts]
{
    type Data = string | boolean;
    let obj: Data = true;
}
export { }

//// [1.ts]
let v = "str" || true;
function bar () {
    return v;
}
export { v, bar }

//// [0.js]
{
    let obj = true;
}
export {};
//// [1.js]
let v = "str" || true;
function bar() {
    return v;
}
export { v, bar };


//// [0.d.ts]
export {};
//// [1.d.ts]
declare let v: string | boolean;
declare function bar(): string | boolean;
export { v, bar };
