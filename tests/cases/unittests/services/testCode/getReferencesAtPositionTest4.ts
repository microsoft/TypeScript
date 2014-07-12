module FindRef4 {
    module MixedStaticsClassTest {
        export class Foo {
            bar: Foo;
            static bar: Foo;

            public foo(): void {
            }
            public static foo(): void {
            }
        }
    }

    function test() {
        // instance function
        var x = new MixedStaticsClassTest.Foo();
        x.foo();
        x.bar;

        var y = new MixedStaticsClassTest.Foo();
        y.foo();
        y.bar;

        // static function
        MixedStaticsClassTest.Foo.foo();
        MixedStaticsClassTest.Foo.bar;
    }
}