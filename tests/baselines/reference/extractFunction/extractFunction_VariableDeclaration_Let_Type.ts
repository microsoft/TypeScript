// ==ORIGINAL==

/*[#|*/let x: number = 1;/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

let x: number = /*RENAME*/newFunction();
x;

function newFunction() {
    let x: number = 1;
    return x;
}
