// @strict: true

export function unsafeCast<T>(_value: unknown): asserts _value is T { }

function yadda() {
    let out = [];
    out.push(100)
    unsafeCast<any>(out);
    return out;
}
