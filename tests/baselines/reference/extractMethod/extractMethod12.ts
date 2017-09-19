// ==ORIGINAL==
namespace A {
    let y = 1;
    class C {
        b() {}
        a() {
            let z = 1;
            let a1 = { x: 1 };
            y = 10;
            z = 42;
            this.b();
            return a1.x + 10;
        }
    }
}
// ==SCOPE::method in class 'C'==
namespace A {
    let y = 1;
    class C {
        b() {}
        a() {
            let z = 1;
            var __return: any;
            ({ __return, z } = this./*RENAME*/newFunction(z));
            return __return;
        }

        private newFunction(z: number) {
            let a1 = { x: 1 };
            y = 10;
            z = 42;
            this.b();
            return { __return: a1.x + 10, z };
        }
    }
}