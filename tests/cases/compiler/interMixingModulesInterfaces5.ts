namespace A {

    interface B {
        name: string;
        value: number;
    }

    export namespace B {
        export function createB(): number {
            return null;
        }
    }
}

var x: number = A.B.createB();