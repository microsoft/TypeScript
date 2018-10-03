// ==ORIGINAL==
const f = () => /*[#|*/2 + 1/*|]*/;
// ==SCOPE::Extract to constant in global scope==
const newLocal = 2 + 1;
const f = () => /*RENAME*/newLocal;