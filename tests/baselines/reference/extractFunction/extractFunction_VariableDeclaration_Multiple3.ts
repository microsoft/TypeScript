// ==ORIGINAL==

/*[#|*/const x = 1, y: string = "a";
let z = 3;/*|]*/
x; y; z;

// ==SCOPE::Extract to function in global scope==

var { x, y, z }: { x: number; y: string; z: number; } = /*RENAME*/newFunction();
x; y; z;

function newFunction() {
    const x = 1, y: string = "a";
    let z = 3;
    return { x, y, z };
}
