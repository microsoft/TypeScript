// @declaration: true

enum LiteralEnum1 {
    A,
    B,
    C
}

enum LiteralEnum2 {
    A = 1,
    B = 2,
    C = 3
}

enum LiteralEnum3 {
    A = 'A' + 'A',
    B = 'B' + 'B'
}

enum NumericEnum1 {
    A = 1 + 1,
    B = 2 + 1,
    C = 3 + 1
}

enum NumericEnum2 {
    A = LiteralEnum1.A,
    B = LiteralEnum2.B
}

enum NumericEnum3 {
    ['A'] = LiteralEnum1.A,
    ['B'] = LiteralEnum2.B
}

const enum ConstEnum {
    A = 'A',
    B = 'B'
}

enum R1 {
    ...LiteralEnum1,
    R1 = 'R1'
}

enum R2 {
    ...LiteralEnum2,
    R2 = 'R2'
}

enum R3 {
    ...LiteralEnum3,
    R3 = 'R3'
}

enum R4 {
    ...NumericEnum1,
    R4 = 'R4'
}

enum R5 {
    ...NumericEnum2,
    R5 = 'R5'
}

enum R6 {
    ...NumericEnum3,
    R6 = 'R6'
}

enum R7 {
    ...ConstEnum,
    R7 = 'R7'
}

const enum R8 {
    ...LiteralEnum1,
    R8 = 'R8'
}
