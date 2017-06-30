==ORIGINAL==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            let a1 = { x: 1 };
            y = 10;
            z = 42;
            return a1.x + 10;
        }
    }
}
==SCOPE::method a==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            return newFunction();

            function newFunction() {
                let a1 = { x: 1 };
                y = 10;
                z = 42;
                return a1.x + 10;
            }
        }
    }
}
==SCOPE::class C==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            var __return: any;
            ({ z, __return } = this.newFunction(z));
            return __return;
        }

        private newFunction(z: any) {
            let a1 = { x: 1 };
            y = 10;
            z = 42;
            return { z, __return: a1.x + 10 };
        }
    }
}
==SCOPE::namespace A==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            var __return: any;
            ({ z, __return } = newFunction(z));
            return __return;
        }
    }

    function newFunction(z: any) {
        let a1 = { x: 1 };
        y = 10;
        z = 42;
        return { z, __return: a1.x + 10 };
    }
}
==SCOPE::file '/a.ts'==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            var __return: any;
            ({ y, z, __return } = newFunction(y, z));
            return __return;
        }
    }
}
function newFunction(y: any, z: any) {
    let a1 = { x: 1 };
    y = 10;
    z = 42;
    return { y, z, __return: a1.x + 10 };
}
