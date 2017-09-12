// ==ORIGINAL==
namespace NS {
    function M1() { }
    function M2() {
        return 1;
    }
    function M3() { }
}
// ==SCOPE::function 'M2'==
namespace NS {
    function M1() { }
    function M2() {
        return newFunction();

        function newFunction() {
            return 1;
        }
    }
    function M3() { }
}
// ==SCOPE::namespace 'NS'==
namespace NS {
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
namespace NS {
    function M1() { }
    function M2() {
        return newFunction();
    }
    function M3() { }
}
function newFunction() {
    return 1;
}
