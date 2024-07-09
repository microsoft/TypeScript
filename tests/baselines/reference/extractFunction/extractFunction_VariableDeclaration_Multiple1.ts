// ==ORIGINAL==

/*[#|*/const x = 1, y: string = "a";/*|]*/
x; y;

// ==SCOPE::Extract to function in global scope==

const { x, y }: { x: number; y: string; } = /*RENAME*/newFunction();
x; y;

function newFunction() {
    const x = 1, y: string = "a";
    return { x, y };
}
