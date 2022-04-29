module Bar {
    export var a = 1;
    var t = undefined[a][a]; // CG: var t = undefined[Bar.a][a];
}
