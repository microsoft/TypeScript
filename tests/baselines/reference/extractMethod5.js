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
            foo();
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
        
            newFunction();

            function newFunction() {
                let y = 5;
                let z = x;
                a = y;
                foo();
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
        
            ({ a } = newFunction(a));
        }

        function newFunction(a: any) {
            let y = 5;
            let z = x;
            a = y;
            foo();
            return { a };
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
        
            ({ a } = newFunction(a));
        }
    }

    function newFunction(a: any) {
        let y = 5;
        let z = x;
        a = y;
        foo();
        return { a };
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
        
            ({ a } = newFunction(x, a));
        }
    }
}
function newFunction(x: any, a: any) {
    let y = 5;
    let z = x;
    a = y;
    A.foo();
    return { a };
}
