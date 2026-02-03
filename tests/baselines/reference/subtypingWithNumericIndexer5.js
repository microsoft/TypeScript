//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithNumericIndexer5.ts] ////

//// [subtypingWithNumericIndexer5.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

interface A {
    [x: number]: Derived;
}

class B implements A {
    [x: string]: Base; // error
}

class B2 implements A {
    [x: string]: Derived2; // ok
}

module Generics {
    interface A<T extends Base> {
        [x: number]: T;
    }

    class B implements A<Base> {
        [x: string]: Derived; // ok
    }

    class B2 implements A<Derived> {
        [x: string]: Derived2; // ok
    }

    class B3<T extends Derived> implements A<T> {
        [x: string]: Base; // error
    }

    class B4<T extends Derived> implements A<T> {
        [x: string]: Derived; // error
    }

    class B5<T extends Derived2> implements A<T> {
        [x: string]: Derived2; // error
    }
}

//// [subtypingWithNumericIndexer5.js]
// Derived type indexer must be subtype of base type indexer
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var B2 = /** @class */ (function () {
    function B2() {
    }
    return B2;
}());
var Generics;
(function (Generics) {
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    var B2 = /** @class */ (function () {
        function B2() {
        }
        return B2;
    }());
    var B3 = /** @class */ (function () {
        function B3() {
        }
        return B3;
    }());
    var B4 = /** @class */ (function () {
        function B4() {
        }
        return B4;
    }());
    var B5 = /** @class */ (function () {
        function B5() {
        }
        return B5;
    }());
})(Generics || (Generics = {}));
