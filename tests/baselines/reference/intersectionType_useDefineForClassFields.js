//// [tests/cases/compiler/intersectionType_useDefineForClassFields.ts] ////

//// [intersectionType_useDefineForClassFields.ts]
type Foo<T> = {
    [k in keyof T & string]: any
}

function bar<T>(_p: T): { new(): Foo<T> } {
    return null as any;
}

class Baz extends bar({ x: 1 }) {
}

//// [intersectionType_useDefineForClassFields.js]
function bar(_p) {
    return null;
}
class Baz extends bar({ x: 1 }) {
}
