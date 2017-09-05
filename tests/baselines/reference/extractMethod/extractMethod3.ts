// ==ORIGINAL==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            let y = 5;
            yield z;
            return foo();
        }
    }
}
// ==SCOPE::function 'a'==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* /*RENAME*/newFunction();

            function* newFunction() {
                let y = 5;
                yield z;
                return foo();
            }
        }
    }
}
// ==SCOPE::namespace 'B'==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* /*RENAME*/newFunction(z);
        }

        function* newFunction(z: number) {
            let y = 5;
            yield z;
            return foo();
        }
    }
}
// ==SCOPE::namespace 'A'==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* /*RENAME*/newFunction(z);
        }
    }

    function* newFunction(z: number) {
        let y = 5;
        yield z;
        return foo();
    }
}
// ==SCOPE::global scope==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* /*RENAME*/newFunction(z, foo);
        }
    }
}
function* newFunction(z: number, foo: () => void) {
    let y = 5;
    yield z;
    return foo();
}
