// @declaration: true

enum LiteralEnum1 {
    A,
    B
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

const enum R3 {
    ...ConstEnum,
    R3 = 'R3'
}

LiteralEnum1.A;
LiteralEnum1.B;
ConstEnum.A;
ConstEnum.B;
R1.A;
R1.B;
R1.R1;
R2.A;
R2.B;
R2.R2;
R3.A;
R3.B;
R3.R3;
