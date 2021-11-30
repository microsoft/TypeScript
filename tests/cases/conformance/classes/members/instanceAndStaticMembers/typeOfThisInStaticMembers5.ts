// @target: esnext, es6, es5

class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}
