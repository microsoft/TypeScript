// ==ORIGINAL==

/*! Copyright */

const x = /*[#|*/2 + 1/*|]*/;
        
// ==SCOPE::Extract to constant in enclosing scope==

/*! Copyright */

const newLocal = 2 + 1;
const x = /*RENAME*/newLocal;
        