module M {
    export interface Point { x: number; y: number }
}

var m = M; // Error, not instantiated can not be used as var

var x: typeof M; // Error only a namespace
