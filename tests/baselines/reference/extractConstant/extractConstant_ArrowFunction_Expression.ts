// ==ORIGINAL==
const f = () => /*[#|*/2 + 1/*|]*/;
// ==SCOPE::Extract to constant in enclosing scope==
const newLocal = 2 + 1;
const f = () => /*RENAME*/newLocal;