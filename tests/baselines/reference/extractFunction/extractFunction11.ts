// ==ORIGINAL==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            /*[#|*/let a1 = { x: 1 };
            y = 10;
            z = 42;
            return a1.x + 10;/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in method 'a'==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            return /*RENAME*/newFunction();

            function newFunction() {
                let a1 = { x: 1 };
                y = 10;
                z = 42;
                return a1.x + 10;
            }
        }
    }
}
// ==SCOPE::Extract to method in class 'C'==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            let __return;
            ({ __return, z } = this./*RENAME*/newMethod(z));
            return __return;
        }

        private newMethod(z: number) {
            let a1 = { x: 1 };
            y = 10;
            z = 42;
            return { __return: a1.x + 10, z };
        }
    }
}
// ==SCOPE::Extract to function in namespace 'A'==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            let __return;
            ({ __return, z } = /*RENAME*/newFunction(z));
            return __return;
        }
    }

    function newFunction(z: number) {
        let a1 = { x: 1 };
        y = 10;
        z = 42;
        return { __return: a1.x + 10, z };
    }
}
// ==SCOPE::Extract to function in global scope==
namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            let __return;
            ({ __return, y, z } = /*RENAME*/newFunction(y, z));
            return __return;
        }
    }
}

function newFunction(y: number, z: number) {
    let a1 = { x: 1 };
    y = 10;
    z = 42;
    return { __return: a1.x + 10, y, z };
}
