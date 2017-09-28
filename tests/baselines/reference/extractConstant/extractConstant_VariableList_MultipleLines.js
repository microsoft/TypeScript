// ==ORIGINAL==
const /*About A*/a = 1,
    /*About B*/b = a + 1;
// ==SCOPE::Extract to constant in global scope==
const /*About A*/a = 1,
    /*About B*/newLocal = a + 1, b = /*RENAME*/newLocal;