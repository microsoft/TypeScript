// ==ORIGINAL==
let a = 1, b = a + 1;
// ==SCOPE::Extract to constant in global scope==
let a = 1, newLocal = a + 1, b = /*RENAME*/newLocal;