// ==ORIGINAL==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        t1.toString();
        t2.toString();
    }
}
// ==SCOPE::inner function in function 'F'==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        /*RENAME*/newFunction();

        function newFunction() {
            t1.toString();
            t2.toString();
        }
    }
}
// ==SCOPE::inner function in function 'F'==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        /*RENAME*/newFunction<T>(t2);
    }

    function newFunction<T>(t2: T) {
        t1.toString();
        t2.toString();
    }
}
// ==SCOPE::function in global scope==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        /*RENAME*/newFunction<T, T>(t1, t2);
    }
}
function newFunction<T, T>(t1: T, t2: T) {
    t1.toString();
    t2.toString();
}
