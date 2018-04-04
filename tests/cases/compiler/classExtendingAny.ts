// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @target: es6
// @Filename: a.ts
declare var Err: any
class A extends Err {
    payload: string
    constructor() {
        super(1,2,3,3,4,56) // no implicit any
        super.unknown // no implicit any
        super['unknown'] // no implicit any
    }
    process() {
        return this.payload + "!";
    }
}

var o = {
    m() {
        super.unknown // no implicit any
    }
}
// @Filename: b.js
class B extends Err {
    constructor() {
        super() // no implicit any
        this.wat = 12
    }
    f() {
        this.wat      // ok
        this.wit // no implicit any
        this['wot'] // no implicit any
        super.alsoBad // no implicit any
    }
}
