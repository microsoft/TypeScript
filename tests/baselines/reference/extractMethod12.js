==ORIGINAL==
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
==SCOPE::class C==
namespace A {
    let y = 1;
    class C {
        b() {}
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
            this.b();
            return { z, __return: a1.x + 10 };
        }
    }
}