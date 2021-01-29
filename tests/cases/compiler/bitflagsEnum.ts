// @bitEnum: true
bitflags enum BitEnum {
    TS = 1,
    TSX = 2,
    All = TS | TSX,
}

var foo1 = BitEnum.TS;
var foo2 = BitEnum.TSX;
var foo3 = foo1 | foo2; // foo3 is possiable to be BitEnum.All?
declare var foo4: BitEnum;
var foo5 = foo4 & foo1; // foo5 is possiable to be BitEnum.TS?

bitflags enum BitEnum1 {
    FOO = 3
}

bitflags enum BitEnum2 {
    FOO = "foo"
}

bitflags enum BitEnum3 {
    FOO = 1 + 2,
    Foo2 = 1 + 2 | 7,
    Foo3 = 7 | 1 + 2
}

enum NormalEnum {
    Black,
    White
}

enum Q{
    q = "2"+1
}

var q1 = NormalEnum.Black;
var w1 = NormalEnum.White;
var e1 = "123" | w1;
q1 |= 2;
