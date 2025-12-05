namespace A {

    namespace B {
        export function createB(): B {
            return null;
        }
    }

    export interface B {
        name: string;
        value: number;
    }
}

var x: A.B = null;