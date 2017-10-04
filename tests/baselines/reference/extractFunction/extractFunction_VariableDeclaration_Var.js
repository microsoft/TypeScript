// ==ORIGINAL==

/*[#|*/var x = 1;/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

var x = /*RENAME*/newFunction();
x;

function newFunction() {
    var x = 1;
    return x;
}
