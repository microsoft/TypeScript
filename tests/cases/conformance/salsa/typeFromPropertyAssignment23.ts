// @noEmit: true
// @checkJs: true
// @allowJs: true
// @Filename: a.js
class B {
    constructor () {
        this.n = 1
    }
    foo() {
    }
}

class C extends B { }

// this override should be fine (even if it's a little odd)
C.prototype.foo = function() {
}

class D extends B { }
D.prototype.foo = () =>  {
    this.n = 'not checked, so no error'
}
