// ==ORIGINAL==
function F<T>(t1: T) {
    function G<T>(t2: T) {
        /*[#|*/t1.toString();
        t2.toString();/*|]*/
    }
}
// ==SCOPE::Extract to inner function in function 'G'==
function F<T>(t1: T) {
    function G<T>(t2: T) {
        /*RENAME*/newFunction();

        function newFunction() {
            t1.toString();
            t2.toString();
        }
    }
}
// ==SCOPE::Extract to inner function in function 'F'==
function F<T>(t1: T) {
    function G<T>(t2: T) {
        /*RENAME*/newFunction<T>(t2);
    }

    function newFunction<T>(t2: T) {
        t1.toString();
        t2.toString();
    }
}
// ==SCOPE::Extract to function in global scope==
function F<T>(t1: T) {
    function G<T>(t2: T) {
        /*RENAME*/newFunction<T, T>(t1, t2);
    }
}

function newFunction<T, T>(t1: T, t2: T) {
    t1.toString();
    t2.toString();
}
