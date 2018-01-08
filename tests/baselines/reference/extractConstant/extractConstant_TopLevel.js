// ==ORIGINAL==
let x = /*[#|*/1/*|]*/;
// ==SCOPE::Extract to constant in enclosing scope==
const newLocal = 1;
let x = /*RENAME*/newLocal;