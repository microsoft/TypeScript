// ==ORIGINAL==

/*[#|*/const x = 1, y = "a";
const z = 3;/*|]*/
x; y; z;

// ==SCOPE::Extract to function in global scope==

const { x, y, z } = /*RENAME*/newFunction();
x; y; z;

function newFunction() {
    const x = 1, y = "a";
    const z = 3;
    return { x, y, z };
}
