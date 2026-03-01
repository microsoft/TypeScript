// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/let x: 0o10 | 10 | 0b10 = 10;
    a++;/*|]*/
    a; x;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    let x: 0o10 | 10 | 0b10 = /*RENAME*/newFunction();
    a; x;

    function newFunction() {
        let x: 0o10 | 10 | 0b10 = 10;
        a++;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x: (0o10 | 10 | 0b10) | undefined;
    ({ x, a } = /*RENAME*/newFunction(a));
    a; x;
}

function newFunction(a: number) {
    let x: 0o10 | 10 | 0b10 = 10;
    a++;
    return { x, a };
}
