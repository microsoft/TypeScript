==ORIGINAL==
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
==SCOPE::function a==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* newFunction();

            function* newFunction() {
                let y = 5;
                yield z;
                return foo();
            }
        }
    }
}
==SCOPE::namespace B==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* newFunction(z);
        }

        function* newFunction(z: any) {
            let y = 5;
            yield z;
            return foo();
        }
    }
}
==SCOPE::namespace A==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* newFunction(z);
        }
    }

    function* newFunction(z: any) {
        let y = 5;
        yield z;
        return foo();
    }
}
==SCOPE::file '/a.ts'==
namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        
            return yield* newFunction(z, foo);
        }
    }
}
function* newFunction(z: any, foo: any) {
    let y = 5;
    yield z;
    return foo();
}
