//// [tests/cases/compiler/checkForObjectTooStrict.ts] ////

//// [checkForObjectTooStrict.ts]
namespace Foo {

    export class Object {

    }

}

 

class Bar extends Foo.Object { // should work

    constructor () {

        super();

    }

}


class Baz extends Object {

    constructor () { // ERROR, as expected

        super();

    }

}


//// [checkForObjectTooStrict.js]
"use strict";
var Foo;
(function (Foo) {
    class Object {
    }
    Foo.Object = Object;
})(Foo || (Foo = {}));
class Bar extends Foo.Object {
    constructor() {
        super();
    }
}
class Baz extends Object {
    constructor() {
        super();
    }
}
