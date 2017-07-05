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
==SCOPE::function a==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return newFunction() + 100;

            function newFunction() { 1 + a1 + x; }
        }
    }
}
==SCOPE::namespace B==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return newFunction(a1) + 100;
        }

        function newFunction(a1: number) { 1 + a1 + x; }
    }
}
==SCOPE::namespace A==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return newFunction(a1) + 100;
        }
    }

    function newFunction(a1: number) { 1 + a1 + x; }
}
==SCOPE::file '/a.ts'==
namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return newFunction(a1, x) + 100;
        }
    }
}
function newFunction(a1: number, x: number) { 1 + a1 + x; }
