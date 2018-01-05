// ==ORIGINAL==

function f() {
    /*[#|*/let x;/*|]*/
    return { x };
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let x = /*RENAME*/newFunction();
    return { x };

    function newFunction() {
        let x;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let x = /*RENAME*/newFunction();
    return { x };
}

function newFunction() {
    let x;
    return x;
}
