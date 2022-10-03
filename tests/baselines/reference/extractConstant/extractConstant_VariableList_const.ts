// ==ORIGINAL==
const a = 1, b = /*[#|*/a + 1/*|]*/;
// ==SCOPE::Extract to constant in enclosing scope==
const a = 1, newLocal = a + 1, b = /*RENAME*/newLocal;