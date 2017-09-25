// ==ORIGINAL==
function F() {
    function G() { }
}
// ==SCOPE::inner function in function 'F'==
function F() {
    /*RENAME*/newFunction();

    function newFunction() {
        function G() { }
    }
}
// ==SCOPE::function in global scope==
function F() {
    /*RENAME*/newFunction();
}
function newFunction() {
    function G() { }
}
