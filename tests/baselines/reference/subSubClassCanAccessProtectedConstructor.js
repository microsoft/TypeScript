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
    constructor() {
        this.instance1 = new Base(); // allowed
    }
}
class Subclass extends Base {
    constructor() {
        super(...arguments);
        this.instance1_1 = new Base(); // allowed
        this.instance1_2 = new Subclass(); // allowed
    }
}
class SubclassOfSubclass extends Subclass {
    constructor() {
        super(...arguments);
        this.instance2_1 = new Base(); // allowed
        this.instance2_2 = new Subclass(); // allowed
        this.instance2_3 = new SubclassOfSubclass(); // allowed
    }
}
