// ==ORIGINAL==

/*! Copyright */

/// <reference path="path.js"/>

"strict";

const x = 2 + 1;
        
// ==SCOPE::Extract to constant in global scope==

/*! Copyright */

/// <reference path="path.js"/>

"strict";

const newLocal = 2 + 1;

const x = /*RENAME*/newLocal;
        