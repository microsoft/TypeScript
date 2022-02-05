//// [optionalAccessor7.ts]
class A {
    get x?() { return '' }
    set x?(value: string) {}
}

class B extends A {
    get x() { return '' }
    set x(value: string) { }
}


//// [optionalAccessor7.js]
class A {
    get x() { return ''; }
    set x(value) { }
}
class B extends A {
    get x() { return ''; }
    set x(value) { }
}
