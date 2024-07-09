// ==ORIGINAL==

/*[#|*/let x: number = 1;
"hello";/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

let x: number = /*RENAME*/newFunction();
x;

function newFunction() {
    let x: number = 1;
    "hello";
    return x;
}
