export namespace X {
    export namespace Y {
        class A {
            constructor(Y: any) {
                new B();
            }
        }
    }
}
export namespace X {
    export namespace Y {
        export class B {
        }
    }
}