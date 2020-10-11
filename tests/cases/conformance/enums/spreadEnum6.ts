// @declaration: true

enum LiteralEnum1 {
    A = 0,
    B
}

enum LiteralEnum1 {
    C,
    D
}

enum LiteralEnum2 {
    E = 0,
    F
}

enum LiteralEnum2 {
    G,
    H
}

enum R1 {
    ...LiteralEnum1,
    R1 = 'R1'
}

enum R1 {
    R11 = 'R11'
}

enum R2 {
    ...LiteralEnum1,
    R2 = 'R2'
}

enum R2 {
    ...LiteralEnum2,
    R22 = 'R22'
}

enum R3 {
    ...R1,
    ...R2,
    R3 = 'R3'
}

LiteralEnum1.A;
LiteralEnum1.B;
LiteralEnum1.C;
LiteralEnum1.D;
R1.A;
R1.B;
R1.C;
R1.D;
R1.R1;
R1.R11;

LiteralEnum2.E;
LiteralEnum2.F;
LiteralEnum2.G;
LiteralEnum2.H;
R2.A;
R2.B;
R2.C;
R2.D;
R2.E;
R2.F;
R2.G;
R2.H;
R2.R2;
R2.R22

R3.A;
R3.B;
R3.C;
R3.D;
R3.E;
R3.F;
R3.G;
R3.H;
R3.R1;
R3.R11;
R3.R2;
R3.R22;
R3.R3;
