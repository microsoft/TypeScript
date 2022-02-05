//// [optionalAccessor1.ts]
const Foo = {
    get x?() { return '' },
    set x?(value: string) {}
}


//// [optionalAccessor1.js]
const Foo = {
    get x() { return ''; },
    set x(value) { }
};
