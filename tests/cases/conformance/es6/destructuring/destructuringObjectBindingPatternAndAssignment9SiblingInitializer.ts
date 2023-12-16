// @noImplicitAny: true

// To be inferred as `number`
function f1() {
    const { a1, b1 = a1 } = { a1: 1 };
    const { a2, b2 = 1 + a2 } = { a2: 1 };
}

// To be inferred as `string`
function f2() {
    const { a1, b1 = a1 } = { a1: 'hi' };
    const { a2, b2 = a2 + '!' } = { a2: 'hi' };
}

// To be inferred as `string | number`
function f3() {
    const { a1, b1 = a1 } = { a1: 'hi', b1: 1 };
    const { a2, b2 = a2 + '!' } = { a2: 'hi', b2: 1 };
}

// Based on comment:
//   - https://github.com/microsoft/TypeScript/issues/49989#issuecomment-1852694486
declare const yadda: { a?: number, b?: number } | undefined
function f4() {
    const { a, b = a } = yadda ?? {};
}
