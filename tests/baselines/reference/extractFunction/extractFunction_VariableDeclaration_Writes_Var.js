// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/var x = 1;
    a++;/*|]*/
    a; x;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    var x = /*RENAME*/newFunction();
    a; x;

    function newFunction() {
        var x = 1;
        a++;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    var x;
    ({ x, a } = /*RENAME*/newFunction(a));
    a; x;
}

function newFunction(a) {
    var x = 1;
    a++;
    return { x, a };
}
