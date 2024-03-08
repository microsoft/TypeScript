class Model {
    constructor(public flag: boolean) {}
}

type DiscriminatedUnion = { flag: true } | { flag: false };
class A<T extends DiscriminatedUnion> {
    constructor(public model: T) { }
}

class B extends A<Model> { }
