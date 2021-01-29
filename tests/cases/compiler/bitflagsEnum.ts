enum BitEnum {
    TS = 1,
    TSX = 3,
    All = TS | TSX,
}

public private const foo111 = 123;

const foo1 = BitEnum.TS;
var foo2 = BitEnum.TSX;
var foo3 = foo1 | foo2; // foo3 is possiable to be BitEnum.All?
declare var foo4: BitEnum;
var foo5 = foo4 & foo1; // foo5 is possiable to be BitEnum.TS?

w = BitEnum.TS;
var e = w | w;
q |= 2;

enum NormalEnum {
    Black,
    White
}

var q1 = NormalEnum.Black;
var w1 = NormalEnum.White;
var e1 = "123" | w1;
q1 |= 2;
