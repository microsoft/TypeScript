// ==ORIGINAL==
namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        /*[#|*/
            let y = 5;
            let z = x;
            return foo();/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in function 'a'==
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
// ==SCOPE::Extract to function in namespace 'B'==
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
// ==SCOPE::Extract to function in namespace 'A'==
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
// ==SCOPE::Extract to function in global scope==
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
