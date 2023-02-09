// @strict: true

const enum E {
    S1 = "foo",
    S2 = "bar",
    
    N1 = 1000,
    N2 = 25,
}

declare var someNumber: number

if (someNumber > E.N2) {
    someNumber = E.N2;
}

declare var someString: string

if (someString > E.S1) {
    someString = E.S2;
}

