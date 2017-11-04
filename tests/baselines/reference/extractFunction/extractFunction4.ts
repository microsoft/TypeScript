// ==ORIGINAL==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        /*[#|*/
            let y = 5;
            if (z) {
                await z1;
            }
            return foo();/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in function 'a'==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await /*RENAME*/newFunction();

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
// ==SCOPE::Extract to function in namespace 'B'==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await /*RENAME*/newFunction(z, z1);
        }

        async function newFunction(z: number, z1: any) {
            let y = 5;
            if (z) {
                await z1;
            }
            return foo();
        }
    }
}
// ==SCOPE::Extract to function in namespace 'A'==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await /*RENAME*/newFunction(z, z1);
        }
    }

    async function newFunction(z: number, z1: any) {
        let y = 5;
        if (z) {
            await z1;
        }
        return foo();
    }
}
// ==SCOPE::Extract to function in global scope==
namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        
            return await /*RENAME*/newFunction(z, z1, foo);
        }
    }
}

async function newFunction(z: number, z1: any, foo: () => void) {
    let y = 5;
    if (z) {
        await z1;
    }
    return foo();
}
