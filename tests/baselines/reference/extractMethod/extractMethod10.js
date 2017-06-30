==ORIGINAL==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
==SCOPE::method a==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return newFunction();

            function newFunction() {
                let a1: I = { x: 1 };
                return a1.x + 10;
            }
        }
    }
}
==SCOPE::class C==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return this.newFunction();
        }

        private newFunction() {
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
==SCOPE::namespace A==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return newFunction();
        }
    }

    function newFunction() {
        let a1: I = { x: 1 };
        return a1.x + 10;
    }
}
==SCOPE::file '/a.ts'==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return newFunction();
        }
    }
}
function newFunction() {
    let a1: A.I = { x: 1 };
    return a1.x + 10;
}
