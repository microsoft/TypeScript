// ==ORIGINAL==

/*[#|*/const x = 1;
"hello";/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

const x = /*RENAME*/newFunction();
x;

function newFunction() {
    const x = 1;
    "hello";
    return x;
}
