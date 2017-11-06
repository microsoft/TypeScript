// ==ORIGINAL==

/*[#|*/const x: number = 1;
"hello";/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

const x: number = /*RENAME*/newFunction();
x;

function newFunction() {
    const x: number = 1;
    "hello";
    return x;
}
