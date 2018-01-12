// ==ORIGINAL==

/*[#|*/let x = 1;
"hello";/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

let x = /*RENAME*/newFunction();
x;

function newFunction() {
    let x = 1;
    "hello";
    return x;
}
