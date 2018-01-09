// ==ORIGINAL==
function F<T>(t1: T) {
    function G<U extends T[]>(t2: U) {
        /*[#|*/t2.toString();/*|]*/
    }
}
// ==SCOPE::Extract to inner function in function 'G'==
function F<T>(t1: T) {
    function G<U extends T[]>(t2: U) {
        /*RENAME*/newFunction();

        function newFunction() {
            t2.toString();
        }
    }
}
// ==SCOPE::Extract to inner function in function 'F'==
function F<T>(t1: T) {
    function G<U extends T[]>(t2: U) {
        /*RENAME*/newFunction<U>(t2);
    }

    function newFunction<U extends T[]>(t2: U) {
        t2.toString();
    }
}
// ==SCOPE::Extract to function in global scope==
function F<T>(t1: T) {
    function G<U extends T[]>(t2: U) {
        /*RENAME*/newFunction<T, U>(t2);
    }
}

function newFunction<T, U extends T[]>(t2: U) {
    t2.toString();
}
