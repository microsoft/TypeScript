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
class Hello {
}
//// [test2.js]
class Hi {
}
//// [test3.js]
class Hola {
}


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
