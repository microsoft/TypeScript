//// [tests/cases/compiler/declarationEmitDetachedComment1.ts] ////

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
/**
 * Hello class
 */
var Hello = /** @class */ (function () {
    function Hello() {
    }
    return Hello;
}());
//// [test2.js]
/* A comment at the top of the file. */
/**
 * Hi class
 */
var Hi = /** @class */ (function () {
    function Hi() {
    }
    return Hi;
}());
//// [test3.js]
// A one-line comment at the top of the file.
/**
 * Hola class
 */
var Hola = /** @class */ (function () {
    function Hola() {
    }
    return Hola;
}());


//// [test1.d.ts]
/*! Copyright 2015 MyCompany Inc. */
/**
 * Hello class
 */
declare class Hello {
}
//// [test2.d.ts]
/**
 * Hi class
 */
declare class Hi {
}
//// [test3.d.ts]
/**
 * Hola class
 */
declare class Hola {
}
