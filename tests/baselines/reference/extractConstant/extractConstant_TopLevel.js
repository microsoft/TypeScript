// ==ORIGINAL==
let x = 1;
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;

let x = /*RENAME*/newLocal;