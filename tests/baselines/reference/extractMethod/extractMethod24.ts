// ==ORIGINAL==
function Outer() {
    function M1() { }
    function M2() {
        return 1;
    }
    function M3() { }
}
// ==SCOPE::inner function in function 'M2'==
function Outer() {
    function M1() { }
    function M2() {
        return newFunction();

        function newFunction() {
            return 1;
        }
    }
    function M3() { }
}
// ==SCOPE::inner function in function 'Outer'==
function Outer() {
    function M1() { }
    function M2() {
        return newFunction();
    }
    function newFunction() {
        return 1;
    }

    function M3() { }
}
// ==SCOPE::function in global scope==
function Outer() {
    function M1() { }
    function M2() {
        return newFunction();
    }
    function M3() { }
}
function newFunction() {
    return 1;
}
