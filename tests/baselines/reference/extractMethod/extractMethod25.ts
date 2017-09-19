// ==ORIGINAL==
function M1() { }
function M2() {
    return 1;
}
function M3() { }
// ==SCOPE::inner function in function 'M2'==
function M1() { }
function M2() {
    return /*RENAME*/newFunction();

    function newFunction() {
        return 1;
    }
}
function M3() { }
// ==SCOPE::function in global scope==
function M1() { }
function M2() {
    return /*RENAME*/newFunction();
}
function newFunction() {
    return 1;
}

function M3() { }