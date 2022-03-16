// ==ORIGINAL==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            /*[#|*/let a1: I = { x: 1 };
            return a1.x + 10;/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in method 'a'==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return /*RENAME*/newFunction();

            function newFunction() {
                let a1: I = { x: 1 };
                return a1.x + 10;
            }
        }
    }
}
// ==SCOPE::Extract to method in class 'C'==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return this./*RENAME*/newMethod();
        }

        private newMethod() {
            let a1: I = { x: 1 };
            return a1.x + 10;
        }
    }
}
// ==SCOPE::Extract to function in namespace 'A'==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return /*RENAME*/newFunction();
        }
    }

    function newFunction() {
        let a1: I = { x: 1 };
        return a1.x + 10;
    }
}
// ==SCOPE::Extract to function in global scope==
namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            return /*RENAME*/newFunction();
        }
    }
}

function newFunction() {
    let a1: A.I = { x: 1 };
    return a1.x + 10;
}
