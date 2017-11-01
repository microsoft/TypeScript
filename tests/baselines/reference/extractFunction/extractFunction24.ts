// ==ORIGINAL==
function Outer() {
    function M1() { }
    function M2() {
        /*[#|*/return 1;/*|]*/
    }
    function M3() { }
}
// ==SCOPE::Extract to inner function in function 'M2'==
function Outer() {
    function M1() { }
    function M2() {
        return /*RENAME*/newFunction();

        function newFunction() {
            return 1;
        }
    }
    function M3() { }
}
// ==SCOPE::Extract to inner function in function 'Outer'==
function Outer() {
    function M1() { }
    function M2() {
        return /*RENAME*/newFunction();
    }
    function newFunction() {
        return 1;
    }

    function M3() { }
}
// ==SCOPE::Extract to function in global scope==
function Outer() {
    function M1() { }
    function M2() {
        return /*RENAME*/newFunction();
    }
    function M3() { }
}

function newFunction() {
    return 1;
}
