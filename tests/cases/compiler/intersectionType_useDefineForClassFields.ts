// @target: ESNext
// @useDefineForClassFields: true

type Foo<T> = {
    [k in keyof T & string]: any
}

function bar<T>(_p: T): { new(): Foo<T> } {
    return null as any;
}

class Baz extends bar({ x: 1 }) {
}