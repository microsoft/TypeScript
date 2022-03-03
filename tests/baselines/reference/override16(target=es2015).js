//// [override16.ts]
class A {
    foo?: string;
}

class B extends A {
    override foo = "string";
}


//// [override16.js]
class A {
}
class B extends A {
    constructor() {
        super(...arguments);
        this.foo = "string";
    }
}
