namespace A {

    export namespace B {
        export function createB(): number {
            return null;
        }
    }

    interface B {
        name: string;
        value: number;
    }
}

var x : number = A.B.createB();