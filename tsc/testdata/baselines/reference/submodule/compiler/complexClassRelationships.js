//// [tests/cases/compiler/complexClassRelationships.ts] ////

//// [complexClassRelationships.ts]
// There should be no errors in this file
class Derived extends Base {
    public static createEmpty(): Derived {
        var item = new Derived();
        return item;
    }
}
class BaseCollection<T extends Base> {
    constructor(f: () => T) {
        (item: Thing) => { return [item.Components]; };
    }
}
class Base {
    ownerCollection: BaseCollection<Base>;
}

class Thing {
    public get Components(): ComponentCollection<any> { return null }
}

class ComponentCollection<T> {
    private static sortComponents(p: Foo) {
        return p.prop1;
    }
}

class Foo {
    public get prop1() {
        return new GenericType<string>(this);
    }
    public populate() {
        this.prop2;
    }
    public get prop2(): BaseCollection<Derived> {
        return new BaseCollection<Derived>(Derived.createEmpty);
    }
}

class GenericType<T> {
    constructor(parent: FooBase) { }
}

class FooBase {
    public populate() {

    }
}

//// [complexClassRelationships.js]
class Derived extends Base {
    static createEmpty() {
        var item = new Derived();
        return item;
    }
}
class BaseCollection {
    constructor(f) {
        (item) => { return [item.Components]; };
    }
}
class Base {
    ownerCollection;
}
class Thing {
    get Components() { return null; }
}
class ComponentCollection {
    static sortComponents(p) {
        return p.prop1;
    }
}
class Foo {
    get prop1() {
        return new GenericType(this);
    }
    populate() {
        this.prop2;
    }
    get prop2() {
        return new BaseCollection(Derived.createEmpty);
    }
}
class GenericType {
    constructor(parent) { }
}
class FooBase {
    populate() {
    }
}
