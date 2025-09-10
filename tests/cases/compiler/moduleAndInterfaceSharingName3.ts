namespace X {
    export namespace Y {
        export interface Z { }
    }
    export interface Y<T> { }
}
var z: X.Y.Z = null;
var z2: X.Y<string>;