interface C {
    new <T>(x: T);
}

var v: C;
var r = new v<number>(1);