//// [tests/cases/compiler/nonIdenticalTypeConstraints.ts] ////

//// [nonIdenticalTypeConstraints.ts]
class Different {
    a: number;
    b: string;
    c: boolean;
}

class Foo<T extends Function> {
    n: T;
}
interface Foo<T extends Different> {
    y: T;
}
interface Qux<T extends Different> {
    y: T;
}
class Qux<T extends Function> {
    n: T;
}

class Bar<T extends Function> {
    n: T;
}
interface Bar<T extends Function> {
    y: T;
}
interface Baz<T extends Function> {
    y: T;
}
class Baz<T extends Function> {
    n: T;
}

class Quux<T> {
    n: T;
}
interface Quux<U> {
    m: U;
}

//// [nonIdenticalTypeConstraints.js]
var Different = /** @class */ (function () {
    function Different() {
    }
    return Different;
}());
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Qux = /** @class */ (function () {
    function Qux() {
    }
    return Qux;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var Baz = /** @class */ (function () {
    function Baz() {
    }
    return Baz;
}());
var Quux = /** @class */ (function () {
    function Quux() {
    }
    return Quux;
}());
