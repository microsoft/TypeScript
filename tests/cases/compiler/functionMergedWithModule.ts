function foo(title: string) {
    var x = 10;
}

namespace foo.Bar {
    export function f() {
    }
}

namespace foo.Baz {
    export function g() {
        Bar.f();
    }
}