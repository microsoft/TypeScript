// ==ORIGINAL==
function F<T, U extends T[], V extends U[]>(v: V) {
    v.toString();
}
// ==SCOPE::inner function in function 'F'==
function F<T, U extends T[], V extends U[]>(v: V) {
    /*RENAME*/newFunction();

    function newFunction() {
        v.toString();
    }
}
// ==SCOPE::function in global scope==
function F<T, U extends T[], V extends U[]>(v: V) {
    /*RENAME*/newFunction<T, U, V>(v);
}
function newFunction<T, U extends T[], V extends U[]>(v: V) {
    v.toString();
}
