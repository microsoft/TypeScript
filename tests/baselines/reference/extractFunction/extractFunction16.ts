// ==ORIGINAL==
function F<T>() {
    const array: T[] = /*[#|*/[]/*|]*/;
}
// ==SCOPE::Extract to inner function in function 'F'==
function F<T>() {
    const array: T[] = /*RENAME*/newFunction();

    function newFunction(): T[] {
        return [];
    }
}
// ==SCOPE::Extract to function in global scope==
function F<T>() {
    const array: T[] = /*RENAME*/newFunction<T>();
}

function newFunction<T>(): T[] {
    return [];
}
