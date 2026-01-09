
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

