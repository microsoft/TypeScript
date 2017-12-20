// ==ORIGINAL==

/*! Copyright */

/* About x */
const x = /*[#|*/2 + 1/*|]*/;
        
// ==SCOPE::Extract to constant in enclosing scope==

/*! Copyright */

const newLocal = 2 + 1;
/* About x */
const x = /*RENAME*/newLocal;
        