// ==ORIGINAL==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
// ==SCOPE::inner function in function 'a'==
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
// ==SCOPE::function in namespace 'B'==
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
// ==SCOPE::function in namespace 'A'==
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
// ==SCOPE::function in global scope==
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
