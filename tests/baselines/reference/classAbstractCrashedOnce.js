//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractCrashedOnce.ts] ////

//// [classAbstractCrashedOnce.ts]
abstract class foo {
    protected abstract test();
}

class bar extends foo {
    test() {
        this.
    }
}
var x = new bar();

//// [classAbstractCrashedOnce.js]
"use strict";
class foo {
}
class bar extends foo {
    test() {
        this.
        ;
    }
}
var x = new bar();
