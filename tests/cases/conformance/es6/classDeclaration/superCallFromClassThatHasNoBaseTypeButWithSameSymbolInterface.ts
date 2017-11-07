interface Foo extends Array<number> {}

class Foo {
    constructor() {
        super(); // error
    }
}
