namespace A {

    export interface B {
        name: string;
        value: number;
    }

    namespace B {
        export function createB(): B {
            return null;
        }
    }
}

var x: A.B = null;