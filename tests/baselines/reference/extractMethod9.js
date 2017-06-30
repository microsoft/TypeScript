==ORIGINAL==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
==SCOPE::function a==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return newFunction();

            function newFunction() {
                let a1: I = { x: 1 };
                return a1.x + 10;
            }
        }
    }
}
==SCOPE::namespace B==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return newFunction();
        }

        function newFunction() {
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
==SCOPE::namespace A==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return newFunction();
        }
    }

    function newFunction() {
        let a1: I = { x: 1 };
        return a1.x + 10;
    }
}
==SCOPE::file '/a.ts'==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return newFunction();
        }
    }
}
function newFunction() {
    let a1: A.I = { x: 1 };
    return a1.x + 10;
}
