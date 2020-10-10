// @declaration: true

enum A {
    AA = 'A',
    AAA = 'AAA'
}

enum B {
    ...A,
    BB = 'B'
}

enum C {
    ...B,
    CC = 'C'
}

enum D {
    ...C,
    DD = 'D'
}

enum E {
    ...D,
    EE = 'E'
}

A.AA;

B.AA;
B.BB;

C.AA;
C.BB;
C.CC;

D.AA;
D.BB;
D.CC;
D.DD;

E.AA;
E.BB;
E.CC;
E.DD;
E.EE;