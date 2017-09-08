// ==ORIGINAL==
function F<T>() {
    const array: T[] = [];
}
// ==SCOPE::function 'F'==
function F<T>() {
    const array: T[] = newFunction();

    function newFunction(): T[] {
        return [];
    }
}
// ==SCOPE::global scope==
function F<T>() {
    const array: T[] = newFunction<T>();
}
function newFunction<T>(): T[] {
    return [];
}
