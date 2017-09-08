// ==ORIGINAL==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        t1.toString();
        t2.toString();
    }
}
// ==SCOPE::function 'F'==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        newFunction();

        function newFunction() {
            t1.toString();
            t2.toString();
        }
    }
}
// ==SCOPE::function 'F'==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        newFunction<T>(t2);
    }

    function newFunction<T>(t2: T) {
        t1.toString();
        t2.toString();
    }
}
// ==SCOPE::global scope==
function F<T>(t1: T) {
    function F<T>(t2: T) {
        newFunction<T, T>(t1, t2);
    }
}
function newFunction<T, T>(t1: T, t2: T) {
    t1.toString();
    t2.toString();
}
