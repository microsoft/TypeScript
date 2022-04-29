// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/let x: number = 1;
    let y = 2;
    a++;/*|]*/
    a; x; y;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    let { x, y }: { x: number; y: number; } = /*RENAME*/newFunction();
    a; x; y;

    function newFunction() {
        let x: number = 1;
        let y = 2;
        a++;
        return { x, y };
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x: number | undefined;
    let y;
    ({ x, y, a } = /*RENAME*/newFunction(a));
    a; x; y;
}

function newFunction(a: number) {
    let x: number = 1;
    let y = 2;
    a++;
    return { x, y, a };
}
