// ==ORIGINAL==
function F() {
    /*[#|*/function G() { }/*|]*/
}
// ==SCOPE::Extract to inner function in function 'F'==
function F() {
    /*RENAME*/newFunction();

    function newFunction() {
        function G() { }
    }
}
// ==SCOPE::Extract to function in global scope==
function F() {
    /*RENAME*/newFunction();
}

function newFunction() {
    function G() { }
}
