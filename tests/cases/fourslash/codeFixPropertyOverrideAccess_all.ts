/// <reference path='fourslash.ts' />

// @strict: true

//// class A {
////     get x() { return 1 }
//// }
//// class B extends A {
////     x = 2
//// }
//// class C {
////     get x() { return 3 }
//// }
//// class D extends C {
////     x = 4
//// }

verify.codeFixAll({
    fixId: "fixPropertyOverrideAccessor",
    fixAllDescription: "Generate 'get' and 'set' accessors for all overriding properties",
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
}
class C {
    get x() { return 3 }
}
class D extends C {
    private _x = 4
    public get x() {
        return this._x
    }
    public set x(value) {
        this._x = value
    }
}`,
})
