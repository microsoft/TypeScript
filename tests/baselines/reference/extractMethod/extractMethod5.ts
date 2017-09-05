// ==ORIGINAL==
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
// ==SCOPE::function 'a'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            /*RENAME*/newFunction();

            function newFunction() {
                let y = 5;
                let z = x;
                a = y;
                foo();
            }
        }
    }
}
// ==SCOPE::namespace 'B'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            a = /*RENAME*/newFunction(a);
        }

        function newFunction(a: number) {
            let y = 5;
            let z = x;
            a = y;
            foo();
            return a;
        }
    }
}
// ==SCOPE::namespace 'A'==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            a = /*RENAME*/newFunction(a);
        }
    }

    function newFunction(a: number) {
        let y = 5;
        let z = x;
        a = y;
        foo();
        return a;
    }
}
// ==SCOPE::global scope==
namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            a = /*RENAME*/newFunction(x, a);
        }
    }
}
function newFunction(x: number, a: number) {
    let y = 5;
    let z = x;
    a = y;
    A.foo();
    return a;
}
