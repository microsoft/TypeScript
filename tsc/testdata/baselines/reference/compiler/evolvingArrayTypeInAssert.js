//// [tests/cases/compiler/evolvingArrayTypeInAssert.ts] ////

//// [evolvingArrayTypeInAssert.ts]
export function unsafeCast<T>(_value: unknown): asserts _value is T { }

function yadda() {
    let out = [];
    out.push(100)
    unsafeCast<any>(out);
    return out;
}


//// [evolvingArrayTypeInAssert.js]
export function unsafeCast(_value) { }
function yadda() {
    let out = [];
    out.push(100);
    unsafeCast(out);
    return out;
}
