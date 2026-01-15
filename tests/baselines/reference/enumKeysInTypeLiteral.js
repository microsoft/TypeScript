//// [tests/cases/compiler/enumKeysInTypeLiteral.ts] ////

//// [enumKeysInTypeLiteral.ts]
enum Type {
  Foo = 'foo',
  '3x14' = '3x14'
}

type TypeMap = {
  [Type.Foo]: 1;
  [Type['3x14']]: 2;
}

const t: TypeMap = {
    'foo': 1,
    '3x14': 2
};

enum Numeric {
    Negative = -1,
    Zero = 0
}

type NumericMap = {
    // Valid: Accessing enum member via string literal for the name
    [Numeric['Negative']]: number; 
    [Numeric['Zero']]: number;
    // Valid: Parenthesized access
    [Numeric[('Negative')]]: number;
}



//// [enumKeysInTypeLiteral.js]
var Type;
(function (Type) {
    Type["Foo"] = "foo";
    Type["3x14"] = "3x14";
})(Type || (Type = {}));
var t = {
    'foo': 1,
    '3x14': 2
};
var Numeric;
(function (Numeric) {
    Numeric[Numeric["Negative"] = -1] = "Negative";
    Numeric[Numeric["Zero"] = 0] = "Zero";
})(Numeric || (Numeric = {}));
