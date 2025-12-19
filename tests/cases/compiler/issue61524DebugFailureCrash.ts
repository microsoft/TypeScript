// @strict: true
// @noEmit: true

// Exact reproduction from https://github.com/microsoft/TypeScript/issues/61524
// This code causes "Debug Failure. No error for last overload signature"

type Generic<T> = T extends any[] ? T[number] : T[keyof T];

export function testFn<A extends Record<string, any>>(
    obj: A,
    cb: (b: Generic<Partial<A>>) => any
) {
    for (const [key, val] of Object.entries(obj)) {
        cb(val as Generic<A>);
    }
}

// Usage that triggers the crash
testFn(
    { foo: "bar", num: 42 },
    (val) => console.log(val)  // Type inference here causes the issue
);