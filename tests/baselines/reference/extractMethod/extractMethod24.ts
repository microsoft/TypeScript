// ==ORIGINAL==
function Outer() {
    function M1() { }
    function M2() {
        return 1;
    }
    function M3() { }
}
// ==SCOPE::function 'M2'==
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
// ==SCOPE::function 'Outer'==
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
// ==SCOPE::global scope==
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
