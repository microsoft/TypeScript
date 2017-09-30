// ==ORIGINAL==

/*! Copyright */

/* About x */
const x = 2 + 1;
        
// ==SCOPE::Extract to constant in global scope==

/*! Copyright */

const newLocal = 2 + 1;

/* About x */
const x = /*RENAME*/newLocal;
        