//// [restTypeRetainsMappyness.ts]
type Foo<T extends any[]> = {
    [P in keyof T]: T[P]
}

function test<T extends any[]>(fn: (...args: Foo<T>) => void) {
    const arr: Foo<T> = {} as any
    fn(...arr) // Error: Argument of type 'any[]' is not assignable to parameter of type 'Foo<T>'
}


//// [restTypeRetainsMappyness.js]
function test(fn) {
    var arr = {};
    fn.apply(void 0, arr); // Error: Argument of type 'any[]' is not assignable to parameter of type 'Foo<T>'
}
