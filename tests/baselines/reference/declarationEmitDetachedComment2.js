//// [tests/cases/compiler/declarationEmitDetachedComment2.ts] ////

//// [test1.ts]
/*! Copyright 2015 MyCompany Inc. */

/**
 * Hello class
 */
class Hello {

}

//// [test2.ts]
/* A comment at the top of the file. */

/**
 * Hi class
 */
class Hi {

}

//// [test3.ts]
// A one-line comment at the top of the file.

/**
 * Hola class
 */
class Hola {

}


//// [test1.js]
/*! Copyright 2015 MyCompany Inc. */
var Hello = (function () {
    function Hello() {
    }
    return Hello;
}());
//// [test2.js]
var Hi = (function () {
    function Hi() {
    }
    return Hi;
}());
//// [test3.js]
var Hola = (function () {
    function Hola() {
    }
    return Hola;
}());


//// [test1.d.ts]
/*! Copyright 2015 MyCompany Inc. */
declare class Hello {
}
//// [test2.d.ts]
declare class Hi {
}
//// [test3.d.ts]
declare class Hola {
}
