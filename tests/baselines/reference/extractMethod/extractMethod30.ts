// ==ORIGINAL==
function F<T>() {
    let t: T;
}
// ==SCOPE::inner function in function 'F'==
function F<T>() {
    /*RENAME*/newFunction();

    function newFunction() {
        let t: T;
    }
}
// ==SCOPE::function in global scope==
function F<T>() {
    /*RENAME*/newFunction<T>();
}
function newFunction<T>() {
    let t: T;
}
