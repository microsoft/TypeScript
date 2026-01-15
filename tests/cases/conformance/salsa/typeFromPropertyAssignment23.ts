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

// post-class prototype assignments are trying to show that these properties are abstract
class Module {
}
Module.prototype.identifier = undefined
Module.prototype.size = null

class NormalModule extends Module {
    identifier() {
        return 'normal'
    }
    size() {
        return 0
    }
}
