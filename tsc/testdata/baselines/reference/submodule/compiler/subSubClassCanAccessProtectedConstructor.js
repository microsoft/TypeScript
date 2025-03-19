//// [tests/cases/compiler/subSubClassCanAccessProtectedConstructor.ts] ////

//// [subSubClassCanAccessProtectedConstructor.ts]
class Base {
    protected constructor() { }
    public instance1 = new Base(); // allowed
}

class Subclass extends Base {
    public instance1_1 = new Base(); // allowed
    public instance1_2 = new Subclass(); // allowed
}

class SubclassOfSubclass extends Subclass {
    public instance2_1 = new Base(); // allowed
    public instance2_2 = new Subclass(); // allowed
    public instance2_3 = new SubclassOfSubclass(); // allowed
}


//// [subSubClassCanAccessProtectedConstructor.js]
class Base {
    constructor() { }
    instance1 = new Base(); // allowed
}
class Subclass extends Base {
    instance1_1 = new Base(); // allowed
    instance1_2 = new Subclass(); // allowed
}
class SubclassOfSubclass extends Subclass {
    instance2_1 = new Base(); // allowed
    instance2_2 = new Subclass(); // allowed
    instance2_3 = new SubclassOfSubclass(); // allowed
}
