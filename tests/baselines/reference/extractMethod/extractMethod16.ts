// ==ORIGINAL==
function F<T>() {
    const array: T[] = [];
}
// ==SCOPE::inner function in function 'F'==
function F<T>() {
    const array: T[] = newFunction();

    function newFunction(): T[] {
        return [];
    }
}
// ==SCOPE::function in global scope==
function F<T>() {
    const array: T[] = newFunction<T>();
}
function newFunction<T>(): T[] {
    return [];
}
