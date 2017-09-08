==ORIGINAL==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return 1 + a1 + x + 100;
        }
    }
}
==SCOPE::function 'a'==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return /*RENAME*/newFunction() + 100;

            function newFunction() {
                return 1 + a1 + x;
            }
        }
    }
}
==SCOPE::namespace 'B'==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return /*RENAME*/newFunction(a1) + 100;
        }

        function newFunction(a1: number) {
            return 1 + a1 + x;
        }
    }
}
==SCOPE::namespace 'A'==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return /*RENAME*/newFunction(a1) + 100;
        }
    }

    function newFunction(a1: number) {
        return 1 + a1 + x;
    }
}
==SCOPE::global scope==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return /*RENAME*/newFunction(a1, x) + 100;
        }
    }
}
function newFunction(a1: number, x: number) {
    return 1 + a1 + x;
}
