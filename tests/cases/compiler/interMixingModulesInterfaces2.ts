module A {

    export interface B {
        name: string;
        value: number;
    }

    module B {
        export function createB(): B {
            return null;
        }
    }
}

var x: A.B = null;