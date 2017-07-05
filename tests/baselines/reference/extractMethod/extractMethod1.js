==ORIGINAL==
namespace A {
    let x = 1;
    function foo() {
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
    function foo() {
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
    function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            ({ a } = newFunction(a));
        }

        function newFunction(a: number) {
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
    function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            ({ a } = newFunction(a));
        }
    }

    function newFunction(a: number) {
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
    function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        
            ({ a } = newFunction(x, a, foo));
        }
    }
}
function newFunction(x: number, a: number, foo: () => void) {
    let y = 5;
    let z = x;
    a = y;
    foo();
    return { a };
}
