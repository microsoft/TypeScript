//// [optionalAccessor2.ts]
class C {
    get x?() { return '' }
    set x?(value: string) {}
}

const foo: C = { };


//// [optionalAccessor2.js]
class C {
    get x() { return ''; }
    set x(value) { }
}
const foo = {};
