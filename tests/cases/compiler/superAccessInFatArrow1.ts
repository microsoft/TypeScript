module test {
    export class A {
        foo() {
        }
    }
    export class B extends A {
        bar(callback: () => void ) {
        }
        runme() {
            this.bar(() => {
                super.foo();
            });
        }
    }
}