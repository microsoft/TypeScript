// ==ORIGINAL==

/*! Copyright */

/* About x */
const x = 2 + 1;
        
// ==SCOPE::Extract to constant in global scope==

/*! Copyright */

/* About x */
const newLocal = 2 + 1;

const x = /*RENAME*/newLocal;
        