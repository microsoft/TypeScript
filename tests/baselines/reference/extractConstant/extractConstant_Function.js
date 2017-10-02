// ==ORIGINAL==
function F() {
    let x = 1;
}
// ==SCOPE::Extract to constant in function 'F'==
function F() {
    const newLocal = 1;

    let x = /*RENAME*/newLocal;
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;

function F() {
    let x = /*RENAME*/newLocal;
}