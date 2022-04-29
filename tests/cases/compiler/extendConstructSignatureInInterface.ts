interface C {
    new(x: number): C;
}

var CStatic: C;
class E extends CStatic {
}

var e: E = new E(1);
