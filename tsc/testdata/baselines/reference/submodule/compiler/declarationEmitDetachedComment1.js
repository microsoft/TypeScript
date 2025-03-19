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
class Hello {
}
//// [test2.js]
/* A comment at the top of the file. */
/**
 * Hi class
 */
class Hi {
}
//// [test3.js]
// A one-line comment at the top of the file.
/**
 * Hola class
 */
class Hola {
}
