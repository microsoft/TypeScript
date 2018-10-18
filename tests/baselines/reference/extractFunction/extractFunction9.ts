// ==ORIGINAL==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            /*[#|*/let a1: I = { x: 1 };
            return a1.x + 10;/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in function 'a'==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return /*RENAME*/newFunction();

            function newFunction() {
                let a1: I = { x: 1 };
                return a1.x + 10;
            }
        }
    }
}
// ==SCOPE::Extract to function in namespace 'B'==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return /*RENAME*/newFunction();
        }

        function newFunction() {
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
// ==SCOPE::Extract to function in namespace 'A'==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return /*RENAME*/newFunction();
        }
    }

    function newFunction() {
        let a1: I = { x: 1 };
        return a1.x + 10;
    }
}
// ==SCOPE::Extract to function in global scope==
namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            return /*RENAME*/newFunction();
        }
    }
}

function newFunction() {
    let a1: A.I = { x: 1 };
    return a1.x + 10;
}
