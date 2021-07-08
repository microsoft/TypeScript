// ==ORIGINAL==
namespace A {
    let y = 1;
    class C {
        b() {}
        a() {
            let z = 1;
            /*[#|*/let a1 = { x: 1 };
            y = 10;
            z = 42;
            this.b();
            return a1.x + 10;/*|]*/
        }
    }
}
// ==SCOPE::Extract to inner function in method 'a'==
namespace A {
    let y = 1;
    class C {
        b() {}
        a() {
            let z = 1;
            return /*RENAME*/newFunction();

            function newFunction() {
                let a1 = { x: 1 };
                y = 10;
                z = 42;
                this.b();
                return a1.x + 10;
            }
        }
    }
}
// ==SCOPE::Extract to method in class 'C'==
namespace A {
    let y = 1;
    class C {
        b() {}
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
            this.b();
            return { __return: a1.x + 10, z };
        }
    }
}