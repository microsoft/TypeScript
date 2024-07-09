class Base {
    private x: { foo: string };
}

class Derived extends Base {
    private x: { foo: string; bar: string; }; // error
}

class Base2 {
    private static y: { foo: string };
}

class Derived2 extends Base2 {
    private static y: { foo: string; bar: string; }; // error
}