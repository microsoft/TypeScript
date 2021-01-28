bitflags enum BitEnum {
    TS = 3,
    TSX = 4,
}

var q = BitEnum.TS;
var w = BitEnum.TSX;
var e = "123" | w;
q |= 2;

enum NormalEnum{
    Black,
    White
}

var q1 = NormalEnum.Black;
var w1 = NormalEnum.White;
var e1 = "123" | w1;
q1 |= 2;
