//// [bitflagsEnum.ts]
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


//// [bitflagsEnum.js]
var BitEnum;
(function (BitEnum) {
    BitEnum[BitEnum["TS"] = 1] = "TS";
    BitEnum[BitEnum["TSX"] = 2] = "TSX";
    BitEnum[BitEnum["All"] = 3] = "All";
})(BitEnum || (BitEnum = {}));
var foo1 = BitEnum.TS;
var foo2 = BitEnum.TSX;
var foo3 = foo1 | foo2; // foo3 is possiable to be BitEnum.All?
var foo5 = foo4 & foo1; // foo5 is possiable to be BitEnum.TS?
var BitEnum1;
(function (BitEnum1) {
    BitEnum1[BitEnum1["FOO"] = 3] = "FOO";
})(BitEnum1 || (BitEnum1 = {}));
var BitEnum2;
(function (BitEnum2) {
    BitEnum2["FOO"] = "foo";
})(BitEnum2 || (BitEnum2 = {}));
var BitEnum3;
(function (BitEnum3) {
    BitEnum3[BitEnum3["FOO"] = 3] = "FOO";
    BitEnum3[BitEnum3["Foo2"] = 7] = "Foo2";
    BitEnum3[BitEnum3["Foo3"] = 7] = "Foo3";
})(BitEnum3 || (BitEnum3 = {}));
var NormalEnum;
(function (NormalEnum) {
    NormalEnum[NormalEnum["Black"] = 0] = "Black";
    NormalEnum[NormalEnum["White"] = 1] = "White";
})(NormalEnum || (NormalEnum = {}));
var Q;
(function (Q) {
    Q[Q["q"] = "2" + 1] = "q";
})(Q || (Q = {}));
var q1 = NormalEnum.Black;
var w1 = NormalEnum.White;
var e1 = "123" | w1;
q1 |= 2;
