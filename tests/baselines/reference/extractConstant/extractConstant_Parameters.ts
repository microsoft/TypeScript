// ==ORIGINAL==
function F() {
    let w = 1;
    let x = /*[#|*/w + 1/*|]*/;
}
// ==SCOPE::Extract to constant in enclosing scope==
function F() {
    let w = 1;
    const newLocal = w + 1;
    let x = /*RENAME*/newLocal;
}