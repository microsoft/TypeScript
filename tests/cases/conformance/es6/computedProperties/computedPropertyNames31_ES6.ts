// @target: es6
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    foo() {
        () => {
            var obj = {
                [super.bar()]() { } // needs capture
            };
        }
        return 0;
    }
}