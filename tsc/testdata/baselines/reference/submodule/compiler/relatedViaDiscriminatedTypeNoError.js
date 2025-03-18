//// [tests/cases/compiler/relatedViaDiscriminatedTypeNoError.ts] ////

//// [relatedViaDiscriminatedTypeNoError.ts]
class Model {
    constructor(public flag: boolean) {}
}

type DiscriminatedUnion = { flag: true } | { flag: false };
class A<T extends DiscriminatedUnion> {
    constructor(public model: T) { }
}

class B extends A<Model> { }


//// [relatedViaDiscriminatedTypeNoError.js]
class Model {
    flag;
    constructor(flag) {
        this.flag = flag;
    }
}
class A {
    model;
    constructor(model) {
        this.model = model;
    }
}
class B extends A {
}
