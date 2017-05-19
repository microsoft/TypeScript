class Base {
    protected constructor() { }
}
class Derived extends Base {
    static make() { new Base() } // ok
}

class Unrelated {
    static fake() { new Base() } // error
}
