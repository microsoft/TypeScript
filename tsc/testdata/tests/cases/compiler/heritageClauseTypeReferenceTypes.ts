namespace A {
    export const valueA = 0;

    export namespace B {
        export const valueB = 0;

        export interface C {}
    }
}

class D implements A.B.C {}
