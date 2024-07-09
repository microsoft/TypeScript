module M {
    export class Point { x: number; y: number }
    export var Point = 1;  // Error
}

module M2 {
    export interface Point { x: number; y: number }
    export var Point = 1;
}

var m = M2;
var p: m.Point; // Error


 