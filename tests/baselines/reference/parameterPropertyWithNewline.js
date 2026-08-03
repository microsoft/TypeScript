//// [tests/cases/compiler/parameterPropertyWithNewline.ts] ////

//// [parameterPropertyWithNewline.ts]
class Foo1 {
  constructor(public
    foo: string) {}
}

class Foo2 {
  constructor(private
    bar: number) {}
}

class Foo3 {
  constructor(protected
    baz: boolean) {}
}

class Foo4 {
  constructor(readonly
    qux: string) {}
}


//// [parameterPropertyWithNewline.js]
"use strict";
class Foo1 {
    constructor(foo) {
        this.foo = foo;
    }
}
class Foo2 {
    constructor(bar) {
        this.bar = bar;
    }
}
class Foo3 {
    constructor(baz) {
        this.baz = baz;
    }
}
class Foo4 {
    constructor(qux) {
        this.qux = qux;
    }
}
