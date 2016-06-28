//// [implementingAnInterfaceExtendingClassWithPrivates.ts]
class Foo {
    private x: string;
}

interface I extends Foo {
    y: number;
}

class Bar implements I { // error
}

class Bar2 implements I { // error
    y: number;
}

class Bar3 implements I { // error
    x: string;
    y: number;
}

class Bar4 implements I { // error
    private x: string;
    y: number;
}

//// [implementingAnInterfaceExtendingClassWithPrivates.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = (function () {
    function Bar() {
    }
    return Bar;
}());
var Bar2 = (function () {
    function Bar2() {
    }
    return Bar2;
}());
var Bar3 = (function () {
    function Bar3() {
    }
    return Bar3;
}());
var Bar4 = (function () {
    function Bar4() {
    }
    return Bar4;
}());
