// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/const x = 1;
    a++;/*|]*/
    a; x;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    const x = /*RENAME*/newFunction();
    a; x;

    function newFunction() {
        const x = 1;
        a++;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x;
    ({ x, a } = /*RENAME*/newFunction(a));
    a; x;
}

function newFunction(a: number) {
    const x = 1;
    a++;
    return { x, a };
}
