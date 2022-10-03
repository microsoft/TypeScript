// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/let x: number | undefined = 1;
    let y: undefined | number = 2;
    let z: (undefined | number) = 3;
    a++;/*|]*/
    a; x; y; z;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    let { x, y, z }: { x: number; y: number; z: number; } = /*RENAME*/newFunction();
    a; x; y; z;

    function newFunction() {
        let x: number | undefined = 1;
        let y: undefined | number = 2;
        let z: (undefined | number) = 3;
        a++;
        return { x, y, z };
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x: number | undefined;
    let y: undefined | number;
    let z: (undefined | number);
    ({ x, y, z, a } = /*RENAME*/newFunction(a));
    a; x; y; z;
}

function newFunction(a: number) {
    let x: number | undefined = 1;
    let y: undefined | number = 2;
    let z: (undefined | number) = 3;
    a++;
    return { x, y, z, a };
}
