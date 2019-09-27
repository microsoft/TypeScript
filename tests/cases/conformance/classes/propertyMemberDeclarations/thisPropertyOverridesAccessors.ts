// @target: esnext
// @allowjs: true
// @noemit: true
// @checkjs: true
// @Filename: foo.ts
class Foo {
    get p() { return 1 }
    set p(value) { }
}

// @Filename: bar.js
class Bar extends Foo {
    constructor() {
        super()
        this.p = 2
    }
}
