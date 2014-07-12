module A {
    export declare module BB {
        export var Elephant;
    }
    export module B {
        export class C {
            x = BB.Elephant.X;
        }
    }
}


