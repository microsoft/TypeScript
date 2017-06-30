==ORIGINAL==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            let y = 5;
            if (z) {
                await z1;
            }
            return foo();
        }
    }
}
==SCOPE::function a==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await newFunction();

            async function newFunction() {
                let y = 5;
                if (z) {
                    await z1;
                }
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
        async function a(z: number, z1: any) {
        
            return await newFunction(z, z1);
        }

        async function newFunction(z: any, z1: any) {
            let y = 5;
            if (z) {
                await z1;
            }
            return foo();
        }
    }
}
==SCOPE::namespace A==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await newFunction(z, z1);
        }
    }

    async function newFunction(z: any, z1: any) {
        let y = 5;
        if (z) {
            await z1;
        }
        return foo();
    }
}
==SCOPE::file '/a.ts'==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await newFunction(z, z1, foo);
        }
    }
}
async function newFunction(z: any, z1: any, foo: any) {
    let y = 5;
    if (z) {
        await z1;
    }
    return foo();
}
