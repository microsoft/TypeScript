// @target: es2015

class A {
    get x?() { return '' }
    set x?(value: string) {}
}

class B extends A {
    get x() { return '' }
    set x(value: string) { }
}
