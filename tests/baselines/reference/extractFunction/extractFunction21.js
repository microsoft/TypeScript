// ==ORIGINAL==
function foo() {
    let x = 10;
    /*[#|*/x++;
    return;/*|]*/
}
// ==SCOPE::Extract to inner function in function 'foo'==
function foo() {
    let x = 10;
    return /*RENAME*/newFunction();

    function newFunction() {
        x++;
        return;
    }
}
// ==SCOPE::Extract to function in global scope==
function foo() {
    let x = 10;
    x = /*RENAME*/newFunction(x);
    return;
}

function newFunction(x) {
    x++;
    return x;
}
