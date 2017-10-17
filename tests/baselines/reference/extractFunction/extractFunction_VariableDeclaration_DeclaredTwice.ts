// ==ORIGINAL==

/*[#|*/var x = 1;
var x = 2;/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

var x = /*RENAME*/newFunction();
x;

function newFunction() {
    var x = 1;
    var x = 2;
    return x;
}
