// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/let x: number = 1;
    a++;/*|]*/
    a; x;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    let x: number = /*RENAME*/newFunction();
    a; x;

    function newFunction() {
        let x: number = 1;
        a++;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x: number | undefined;
    ({ x, a } = /*RENAME*/newFunction(a));
    a; x;
}

function newFunction(a: number) {
    let x: number = 1;
    a++;
    return { x, a };
}
