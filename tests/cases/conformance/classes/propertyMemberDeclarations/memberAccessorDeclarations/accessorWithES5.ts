// @target: ES5
// @useDefineForClassFields: false
// @declaration: true

class C {
    get x() {
        return 1;
    }
}

class D {
    set x(v) {
    }
}

class E {
    // comment 1
    get x() { return 2; }
    // comment 2
    set x(v) { }
}

var x = {
    get a() { return 1 }
}

var y = {
    set b(v) { }
}
