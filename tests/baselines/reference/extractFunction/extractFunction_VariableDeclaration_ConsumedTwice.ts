// ==ORIGINAL==

/*[#|*/const x: number = 1;/*|]*/
x; x;

// ==SCOPE::Extract to function in global scope==

const x: number = /*RENAME*/newFunction();
x; x;

function newFunction() {
    const x: number = 1;
    return x;
}
