// ==ORIGINAL==
function F<T>(t: T) {
    let x = t + 1;
}
// ==SCOPE::Extract to constant in function 'F'==
function F<T>(t: T) {
    const newLocal = t + 1;

    let x = /*RENAME*/newLocal;
}