module SimpleClassTest {
    class Foo {
        public foo(): void {
        }
    }
    class Bar extends Foo {
        public foo(): void {
        }
    }
}

module SimpleInterfaceTest {
    interface IFoo {
        foo(): void;
    }
    interface IBar extends IFoo {
        foo(): void;
    }
}

module SimpleClassInterfaceTest {
    interface IFoo {
        foo(): void;
    }
    class Bar implements IFoo {
        public foo(): void {
        }
    }
}

module Test {
    interface IBase {
        field: string;
        method(): void;
    }

    interface IBlah extends IBase {
        field: string;
    }

    interface IBlah2 extends IBlah {
        field: string;
    }

    interface IDerived extends IBlah2 {
        method(): void;
    }

    class Bar implements IDerived {
        public field: string;
        public method(): void { }
    }

    class BarBlah extends Bar {
        public field: string;
    }
}
