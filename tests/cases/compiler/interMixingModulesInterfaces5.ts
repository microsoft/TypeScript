module A {

    interface B {
        name: string;
        value: number;
    }

    export module B {
        export function createB(): number {
            return null;
        }
    }
}

var x: number = A.B.createB();