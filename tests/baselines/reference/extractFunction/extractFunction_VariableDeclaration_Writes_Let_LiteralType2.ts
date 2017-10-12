// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/let x: "a" | 'b' = 'a';
    a++;/*|]*/
    a; x;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    let x: "a" | 'b' = /*RENAME*/newFunction();
    a; x;

    function newFunction() {
        let x: "a" | 'b' = 'a';
        a++;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x: ("a" | 'b') | undefined;
    ({ x, a } = /*RENAME*/newFunction(a));
    a; x;
}

function newFunction(a: number) {
    let x: "a" | 'b' = 'a';
    a++;
    return { x, a };
}
