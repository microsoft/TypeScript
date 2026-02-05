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
"use strict";
/*! Copyright 2015 MyCompany Inc. */
/**
 * Hello class
 */
class Hello {
}
//// [test2.js]
"use strict";
/* A comment at the top of the file. */
/**
 * Hi class
 */
class Hi {
}
//// [test3.js]
"use strict";
// A one-line comment at the top of the file.
/**
 * Hola class
 */
class Hola {
}


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
