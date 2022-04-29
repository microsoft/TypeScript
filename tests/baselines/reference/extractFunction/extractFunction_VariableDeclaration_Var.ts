// ==ORIGINAL==

/*[#|*/var x = 1;
"hello"/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

var x = /*RENAME*/newFunction();
x;

function newFunction() {
    var x = 1;
    "hello";
    return x;
}
