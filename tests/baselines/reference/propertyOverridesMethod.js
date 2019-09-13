//// [propertyOverridesMethod.ts]
class A {
    m() { }
}
class B extends A {
    m = () => 1
}


//// [propertyOverridesMethod.js]
class A {
    m() { }
}
class B extends A {
    constructor() {
        super(...arguments);
        this.m = () => 1;
    }
}
