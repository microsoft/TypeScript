/// <reference path='fourslash.ts' />

// @strict: true

//// class A {
////     x = 1
//// }
//// class B extends A {
////     get x() { return 2 }
//// }

verify.codeFix({
    description: `Generate 'get' and 'set' accessors`,
    newFileContent: `class A {
    private _x = 1
    public get x() {
        return this._x
    }
    public set x(value) {
        this._x = value
    }
}
class B extends A {
    get x() { return 2 }
}`,
    index: 0
})
