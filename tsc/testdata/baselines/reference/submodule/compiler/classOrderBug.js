//// [tests/cases/compiler/classOrderBug.ts] ////

//// [classOrderBug.ts]
class bar {
    public baz: foo;
    constructor() {

        this.baz = new foo();

    }

}

class baz {}
class foo extends baz {}




//// [classOrderBug.js]
"use strict";
class bar {
    baz;
    constructor() {
        this.baz = new foo();
    }
}
class baz {
}
class foo extends baz {
}
