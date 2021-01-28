//// [bitflagsEnum.ts]
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


//// [bitflagsEnum.js]
var BitEnum;
(function (BitEnum) {
    BitEnum[BitEnum["TS"] = 3] = "TS";
    BitEnum[BitEnum["TSX"] = 4] = "TSX";
})(BitEnum || (BitEnum = {}));
var q = BitEnum.TS;
var w = BitEnum.TSX;
var e = "123" | w;
q |= 2;
var NormalEnum;
(function (NormalEnum) {
    NormalEnum[NormalEnum["Black"] = 0] = "Black";
    NormalEnum[NormalEnum["White"] = 1] = "White";
})(NormalEnum || (NormalEnum = {}));
var q1 = NormalEnum.Black;
var w1 = NormalEnum.White;
var e1 = "123" | w1;
q1 |= 2;
