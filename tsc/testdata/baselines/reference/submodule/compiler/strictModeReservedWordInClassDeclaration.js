//// [tests/cases/compiler/strictModeReservedWordInClassDeclaration.ts] ////

//// [strictModeReservedWordInClassDeclaration.ts]
interface public { }

class Foo {
    constructor(private, public, static) {
        private = public = static;
    }
    public banana(x: public) { }
}

class C {
    constructor(public public, let) {
    }
    foo1(private, static, public) {
        function let() { }
        var z = function let() { };
    }

    public pulbic() { } // No Error;
}

class D<public, private>{ }

class E implements public { }

class F implements public.private.B { }
class F1 implements public.private.implements { }
class G extends package { }
class H extends package.A { }

//// [strictModeReservedWordInClassDeclaration.js]
class Foo {
    constructor(private, public, static) {
        private = public = static;
    }
    banana(x) { }
}
class C {
    public;
    constructor(public, let) {
        this.public = public;
    }
    foo1(private, static, public) {
        function let() { }
        var z = function let() { };
    }
    pulbic() { } // No Error;
}
class D {
}
class E {
}
class F {
}
class F1 {
}
class G extends package {
}
class H extends package.A {
}
