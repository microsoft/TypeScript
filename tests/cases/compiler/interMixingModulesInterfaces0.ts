// bug 742098: intermixing modules and interfaces causes errors at call site and order matters

module A {

    export module B {
        export function createB(): B {
            return null;
        }
    }

    export interface B {
        name: string;
        value: number;
    }
}

var x: A.B = A.B.createB();