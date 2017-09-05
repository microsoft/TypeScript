// ==ORIGINAL==
function F<T>(t1: T) {
    function F<U extends T[]>(t2: U) {
        t2.toString();
    }
}
// ==SCOPE::function 'F'==
function F<T>(t1: T) {
    function F<U extends T[]>(t2: U) {
        /*RENAME*/newFunction();

        function newFunction() {
            t2.toString();
        }
    }
}
// ==SCOPE::function 'F'==
function F<T>(t1: T) {
    function F<U extends T[]>(t2: U) {
        /*RENAME*/newFunction<U>(t2);
    }

    function newFunction<U extends T[]>(t2: U) {
        t2.toString();
    }
}
// ==SCOPE::global scope==
function F<T>(t1: T) {
    function F<U extends T[]>(t2: U) {
        /*RENAME*/newFunction<T, U>(t2);
    }
}
function newFunction<T, U extends T[]>(t2: U) {
    t2.toString();
}
