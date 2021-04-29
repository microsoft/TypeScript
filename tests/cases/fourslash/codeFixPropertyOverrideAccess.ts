/// <reference path='fourslash.ts' />

// @strict: true

//// class A {
////     get x() { return 1 }
//// }
//// class B extends A {
////     x = 2
//// }

verify.codeFix({
    description: `Generate 'get' and 'set' accessors`,
    newFileContent: `class A {
    get x() { return 1 }
}
class B extends A {
    private _x = 2
    public get x() {
        return this._x
    }
    public set x(value) {
        this._x = value
    }
}`,
    index: 0
})
