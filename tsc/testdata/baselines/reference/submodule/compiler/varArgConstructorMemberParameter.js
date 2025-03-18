//// [tests/cases/compiler/varArgConstructorMemberParameter.ts] ////

//// [varArgConstructorMemberParameter.ts]
class Foo1 {
    constructor (...args: string[]) { }
}

class Foo2 {
    constructor (public args: string[]) { }
}

class Foo3 {
    constructor (public ...args: string[]) { }
}


//// [varArgConstructorMemberParameter.js]
class Foo1 {
    constructor(...args) { }
}
class Foo2 {
    args;
    constructor(args) {
        this.args = args;
    }
}
class Foo3 {
    args;
    constructor(...args) {
        this.args = args;
    }
}
