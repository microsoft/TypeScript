// ==ORIGINAL==

function F() {
/*[#|*/arguments.length/*|]*/; // arguments has no declaration
}
// ==SCOPE::Extract to inner function in function 'F'==

function F() {
    /*RENAME*/newFunction(); // arguments has no declaration


    function newFunction() {
        arguments.length;
    }
}
// ==SCOPE::Extract to function in global scope==

function F() {
    /*RENAME*/newFunction(); // arguments has no declaration
}

function newFunction() {
    arguments.length;
}
