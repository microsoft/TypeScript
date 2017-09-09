// ==ORIGINAL==
namespace A {
    let x = 1;
    export namespace C {
        export function foo() {
        }
    }
    namespace B {
        function a() {
            let a = 1;
        
            let y = 5;
            let z = x;
            a = y;
            return C.foo();
        }
    }
}
// ==SCOPE::inner function in function 'a'==
namespace A {
    let x = 1;
    export namespace C {
        export function foo() {
        }
    }
    namespace B {
        function a() {
            let a = 1;
        
            return newFunction();

            function newFunction() {
                let y = 5;
                let z = x;
                a = y;
                return C.foo();
            }
        }
    }
}
// ==SCOPE::function in namespace 'B'==
namespace A {
    let x = 1;
    export namespace C {
        export function foo() {
        }
    }
    namespace B {
        function a() {
            let a = 1;
        
            var __return: any;
            ({ __return, a } = newFunction(a));
            return __return;
        }

        function newFunction(a: number) {
            let y = 5;
            let z = x;
            a = y;
            return { __return: C.foo(), a };
        }
    }
}
// ==SCOPE::function in namespace 'A'==
namespace A {
    let x = 1;
    export namespace C {
        export function foo() {
        }
    }
    namespace B {
        function a() {
            let a = 1;
        
            var __return: any;
            ({ __return, a } = newFunction(a));
            return __return;
        }
    }

    function newFunction(a: number) {
        let y = 5;
        let z = x;
        a = y;
        return { __return: C.foo(), a };
    }
}
// ==SCOPE::function in global scope==
namespace A {
    let x = 1;
    export namespace C {
        export function foo() {
        }
    }
    namespace B {
        function a() {
            let a = 1;
        
            var __return: any;
            ({ __return, a } = newFunction(x, a));
            return __return;
        }
    }
}
function newFunction(x: number, a: number) {
    let y = 5;
    let z = x;
    a = y;
    return { __return: A.C.foo(), a };
}
