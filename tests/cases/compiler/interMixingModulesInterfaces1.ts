module A {

    export interface B {
        name: string;
        value: number;
    }

    export module B {
        export function createB(): B {
            return null;
        }
    }
}

var x: A.B = A.B.createB();