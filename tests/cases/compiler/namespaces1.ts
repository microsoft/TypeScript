namespace X {
    export namespace Y {
        export interface Z { }
    }
    export interface Y { }
}

var x: X.Y.Z;
var x2: X.Y;