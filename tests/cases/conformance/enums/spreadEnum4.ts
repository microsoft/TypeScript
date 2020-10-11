// @declaration: true
// @preserveConstEnums: true

enum LiteralEnum1 {
    A,
    B,
    C
}

const enum ConstEnum {
    A = 'A',
    B = 'B'
}

enum R1 {
    ...ConstEnum,
    R1 = 'R1'
}

const enum R2 {
    ...LiteralEnum1,
    R2 = 'R2'
}
