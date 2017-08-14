==ORIGINAL==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            let y = 5;
            let z = x;
            a = y;
            return foo();
        }
    }
}
==SCOPE::function a==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            return newFunction();

            function newFunction() {
                let y = 5;
                let z = x;
                a = y;
                return foo();
            }
        }
    }
}
==SCOPE::namespace B==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            var __return: any;
            ({ a, __return } = newFunction(a));
            return __return;
        }

        function newFunction(a: any) {
            let y = 5;
            let z = x;
            a = y;
            return { a, __return: foo() };
        }
    }
}
==SCOPE::namespace A==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            var __return: any;
            ({ a, __return } = newFunction(a));
            return __return;
        }
    }

    function newFunction(a: any) {
        let y = 5;
        let z = x;
        a = y;
        return { a, __return: foo() };
    }
}
==SCOPE::file '/a.ts'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            var __return: any;
            ({ a, __return } = newFunction(x, a));
            return __return;
        }
    }
}
function newFunction(x: any, a: any) {
    let y = 5;
    let z = x;
    a = y;
    return { a, __return: A.foo() };
}
