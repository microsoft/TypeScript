class Foo1 {
    constructor (...args: string[]) { }
}

class Foo2 {
    constructor (public args: string[]) { }
}

class Foo3 {
    constructor (public ...args: string[]) { }
}
