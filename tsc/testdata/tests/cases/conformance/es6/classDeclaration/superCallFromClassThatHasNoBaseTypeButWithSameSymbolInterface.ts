// @target: es2015
interface Foo extends Array<number> {}

class Foo {
    constructor() {
        super(); // error
    }
}
