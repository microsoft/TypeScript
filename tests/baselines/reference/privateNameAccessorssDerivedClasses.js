//// [privateNameAccessorssDerivedClasses.ts]
class Base {
    get #prop(): number { return  123; }
    static method(x: Derived) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x: Derived) {
        console.log(x.#prop);
    }
}


//// [privateNameAccessorssDerivedClasses.js]
var _prop;
class Base {
    get () { return 123; }
    static method(x) {
        console.log(x.);
    }
}
class Derived extends Base {
    static method(x) {
        console.log(x.);
    }
}
