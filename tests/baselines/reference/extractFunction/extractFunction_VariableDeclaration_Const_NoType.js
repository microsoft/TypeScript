// ==ORIGINAL==

/*[#|*/const x = 1;/*|]*/
x;

// ==SCOPE::Extract to function in global scope==

const x = /*RENAME*/newFunction();
x;

function newFunction() {
    const x = 1;
    return x;
}
