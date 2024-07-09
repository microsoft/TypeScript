// ==ORIGINAL==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        /*[#|*/
            let y = 5;
            let z = x;
            a = y;
            return foo();/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in function 'a'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            return /*RENAME*/newFunction();

            function newFunction() {
                let y = 5;
                let z = x;
                a = y;
                return foo();
            }
        }
    }
}
// ==SCOPE::Extract to function in namespace 'B'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            let __return;
            ({ __return, a } = /*RENAME*/newFunction(a));
            return __return;
        }

        function newFunction(a: number) {
            let y = 5;
            let z = x;
            a = y;
            return { __return: foo(), a };
        }
    }
}
// ==SCOPE::Extract to function in namespace 'A'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            let __return;
            ({ __return, a } = /*RENAME*/newFunction(a));
            return __return;
        }
    }

    function newFunction(a: number) {
        let y = 5;
        let z = x;
        a = y;
        return { __return: foo(), a };
    }
}
// ==SCOPE::Extract to function in global scope==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            let __return;
            ({ __return, a } = /*RENAME*/newFunction(x, a));
            return __return;
        }
    }
}

function newFunction(x: number, a: number) {
    let y = 5;
    let z = x;
    a = y;
    return { __return: A.foo(), a };
}
