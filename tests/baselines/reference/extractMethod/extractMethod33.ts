// ==ORIGINAL==
function F() {
    function G() { }
}
// ==SCOPE::function 'F'==
function F() {
    /*RENAME*/newFunction();

    function newFunction() {
        function G() { }
    }
}
// ==SCOPE::global scope==
function F() {
    /*RENAME*/newFunction();
}
function newFunction() {
    function G() { }
}
