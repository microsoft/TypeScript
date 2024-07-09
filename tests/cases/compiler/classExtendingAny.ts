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
        super(1,2,3,3,4,56)
        super.unknown
        super['unknown']
    }
    process() {
        return this.payload + "!";
    }
}

var o = {
    m() {
        super.unknown
    }
}
// @Filename: b.js
class B extends Err {
    constructor() {
        super()
        this.wat = 12
    }
    f() {
        this.wat
        this.wit
        this['wot']
        super.alsoBad
    }
}
