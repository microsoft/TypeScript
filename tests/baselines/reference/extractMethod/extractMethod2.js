==ORIGINAL==
namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        
            let y = 5;
            let z = x;
            return foo();
        }
    }
}
==SCOPE::function 'a'==
namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        
            return /*RENAME*/newFunction();

            function newFunction() {
                let y = 5;
                let z = x;
                return foo();
            }
        }
    }
}
==SCOPE::namespace 'B'==
namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        
            return /*RENAME*/newFunction();
        }

        function newFunction() {
            let y = 5;
            let z = x;
            return foo();
        }
    }
}
==SCOPE::namespace 'A'==
namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        
            return /*RENAME*/newFunction();
        }
    }

    function newFunction() {
        let y = 5;
        let z = x;
        return foo();
    }
}
==SCOPE::global scope==
namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        
            return /*RENAME*/newFunction(x, foo);
        }
    }
}
function newFunction(x: number, foo: () => void) {
    let y = 5;
    let z = x;
    return foo();
}
