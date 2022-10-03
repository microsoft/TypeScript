// ==ORIGINAL==

interface I { a: 1 | 2 | 3 }
let i: I = /*[#|*/{ a: 1 }/*|]*/;

// ==SCOPE::Extract to constant in enclosing scope==

interface I { a: 1 | 2 | 3 }
const newLocal = { a: 1 };
let i: I = /*RENAME*/newLocal;
