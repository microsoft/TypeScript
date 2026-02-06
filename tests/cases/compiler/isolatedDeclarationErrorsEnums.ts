// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @strict: true
// @target: ESNext

declare function computed(x: number): number;

enum E {
    A = computed(0),
    B = computed(1),
    C = computed(2),
    D = computed(3),
}


enum F {
    A = E.A,
    B = A,
}


enum Flag {
    A = 1 >> 1,
    B = 2 >> 2,
    C = 3 >> 2,
    AB = A | B,
    ABC = Flag.AB | C,
    AC = Flag["A"] | C,
}

const EV = 1;
enum ExtFlags {
    D = 4 >> 1,
    E = EV,
    ABCD = Flag.ABC | D,
    AC = Flag["A"] | D,
}


enum Str {
    A = "A",
    B = "B",
    AB = A + B
}


enum StrExt {
    D = "D",
    ABD = Str.AB + D,
    AD = Str["A"] + D,
}