module FindRef3 {
    module SimpleClassTest {
        export class Foo {
            public foo(): void {
            }
        }
        export class Bar extends Foo {
            public foo(): void {
            }
        }
    }

    module SimpleInterfaceTest {
        export interface IFoo {
            foo(): void;
        }
        export interface IBar extends IFoo {
            foo(): void;
        }
    }

    module SimpleClassInterfaceTest {
        export interface IFoo {
            foo(): void;
        }
        export class Bar implements IFoo {
            public foo(): void {
            }
        }
    }

    module Test {
        export interface IBase {
            field: string;
            method(): void;
        }

        export interface IBlah extends IBase {
            field: string;
        }

        export interface IBlah2 extends IBlah {
            field: string;
        }

        export interface IDerived extends IBlah2 {
            method(): void;
        }

        export class Bar implements IDerived {
            public field: string;
            public method(): void { }
        }

        export class BarBlah extends Bar {
            public field: string;
        }
    }

    function test() {
        var x = new SimpleClassTest.Bar();
        x.foo();

        var y: SimpleInterfaceTest.IBar = null;
        y.foo();

        var z = new Test.BarBlah();
        z.field = "";
    }
}