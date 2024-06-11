//// [tests/cases/conformance/types/keyof/satisfiesKeyofInputTypes.ts] ////

//// [satisfiesKeyofInputTypes.ts]
const sym = Symbol();
const num = 1;
const str = "f";
const union = Math.random() > 0.5 ? "answer" : 42;

enum NumEnum {
    A,
    B,
}

enum StrEnum {
    A = "a",
    B = "b"
}

enum MixEnum {
    A = 10,
    B = "bb",
}

const anything = null as any;
const unk = null as any as unknown;
const basestr = "" as string;
const basenum = 11 as number;
const bool = true as boolean;
const t = true;
const f = false;
const n = null;
const u = undefined;
const bigbase = 1n as bigint;
const biglit = 22n;
const symbase = null as any as symbol;
const nev = null as never;
const templateLit = `aaabb` as `aaa${string}`;
const mappingLit = `bbbaa` as Lowercase<string>;

export class Foo {
    [sym satisfies keyof]() {
        return 1 as const;
    }

    [num satisfies keyof]() {
        return 2 as const;
    }

    [str satisfies keyof]() {
        return 3 as const;
    }

    [union satisfies keyof]() {
        return 4 as const;
    }

    [NumEnum.A satisfies keyof]() {
        return 5 as const;
    }

    [StrEnum.A satisfies keyof]() {
        return 6 as const;
    }

    [MixEnum.A satisfies keyof]() {
        return 7 as const;
    }

    [MixEnum.B satisfies keyof]() {
        return 8 as const;
    }

    [anything satisfies keyof]() {
        return 9 as const;
    }

    [unk satisfies keyof]() {
        return 10 as const;
    }

    [basestr satisfies keyof]() {
        return 11 as const;
    }

    [basenum satisfies keyof]() {
        return 12 as const;
    }

    [bool satisfies keyof]() {
        return 13 as const;
    }

    [t satisfies keyof]() {
        return 14 as const;
    }

    [f satisfies keyof]() {
        return 15 as const;
    }

    [n satisfies keyof]() {
        return 16 as const;
    }

    [u satisfies keyof]() {
        return 17 as const;
    }

    [bigbase satisfies keyof]() {
        return 18 as const;
    }

    [biglit satisfies keyof]() {
        return 19 as const;
    }

    [symbase satisfies keyof]() {
        return 20 as const;
    }

    [nev satisfies keyof]() {
        return 21 as const;
    }

    [templateLit satisfies keyof]() {
        return 22 as const;
    }

    [mappingLit satisfies keyof]() {
        return 23 as const;
    }
}

const inst = new Foo();
export const results = [
    inst[sym](),
    inst[num](),
    inst[str](),
    inst[union](),
    inst[NumEnum.A](),
    inst[StrEnum.A](),
    inst[MixEnum.A](),
    inst[MixEnum.B](),
    inst[anything](),
    inst[unk](),
    inst[basestr](),
    inst[basenum](),
    inst[bool](),
    inst[t](),
    inst[f](),
    inst[n](),
    inst[u](),
    inst[bigbase](),
    inst[biglit](),
    inst[symbase](),
    inst[nev](), // indexing by `never` always gives `never`, rather than the fallback index property
    inst[templateLit](),
    inst[mappingLit](),    
] as const;




//// [satisfiesKeyofInputTypes.js]
const sym = Symbol();
const num = 1;
const str = "f";
const union = Math.random() > 0.5 ? "answer" : 42;
var NumEnum;
(function (NumEnum) {
    NumEnum[NumEnum["A"] = 0] = "A";
    NumEnum[NumEnum["B"] = 1] = "B";
})(NumEnum || (NumEnum = {}));
var StrEnum;
(function (StrEnum) {
    StrEnum["A"] = "a";
    StrEnum["B"] = "b";
})(StrEnum || (StrEnum = {}));
var MixEnum;
(function (MixEnum) {
    MixEnum[MixEnum["A"] = 10] = "A";
    MixEnum["B"] = "bb";
})(MixEnum || (MixEnum = {}));
const anything = null;
const unk = null;
const basestr = "";
const basenum = 11;
const bool = true;
const t = true;
const f = false;
const n = null;
const u = undefined;
const bigbase = 1n;
const biglit = 22n;
const symbase = null;
const nev = null;
const templateLit = `aaabb`;
const mappingLit = `bbbaa`;
export class Foo {
    [sym]() {
        return 1;
    }
    [num]() {
        return 2;
    }
    [str]() {
        return 3;
    }
    [union]() {
        return 4;
    }
    [NumEnum.A]() {
        return 5;
    }
    [StrEnum.A]() {
        return 6;
    }
    [MixEnum.A]() {
        return 7;
    }
    [MixEnum.B]() {
        return 8;
    }
    [anything]() {
        return 9;
    }
    [unk]() {
        return 10;
    }
    [basestr]() {
        return 11;
    }
    [basenum]() {
        return 12;
    }
    [bool]() {
        return 13;
    }
    [t]() {
        return 14;
    }
    [f]() {
        return 15;
    }
    [n]() {
        return 16;
    }
    [u]() {
        return 17;
    }
    [bigbase]() {
        return 18;
    }
    [biglit]() {
        return 19;
    }
    [symbase]() {
        return 20;
    }
    [nev]() {
        return 21;
    }
    [templateLit]() {
        return 22;
    }
    [mappingLit]() {
        return 23;
    }
}
const inst = new Foo();
export const results = [
    inst[sym](),
    inst[num](),
    inst[str](),
    inst[union](),
    inst[NumEnum.A](),
    inst[StrEnum.A](),
    inst[MixEnum.A](),
    inst[MixEnum.B](),
    inst[anything](),
    inst[unk](),
    inst[basestr](),
    inst[basenum](),
    inst[bool](),
    inst[t](),
    inst[f](),
    inst[n](),
    inst[u](),
    inst[bigbase](),
    inst[biglit](),
    inst[symbase](),
    inst[nev](), // indexing by `never` always gives `never`, rather than the fallback index property
    inst[templateLit](),
    inst[mappingLit](),
];


//// [satisfiesKeyofInputTypes.d.ts]
declare const sym: unique symbol;
declare const num = 1;
declare const str = "f";
declare const union: string | number;
declare enum NumEnum {
    A = 0,
    B = 1
}
declare enum StrEnum {
    A = "a",
    B = "b"
}
declare enum MixEnum {
    A = 10,
    B = "bb"
}
declare const anything: any;
declare const unk: unknown;
declare const basestr: string;
declare const basenum: number;
declare const bool: boolean;
declare const t = true;
declare const f = false;
declare const n: null;
declare const u: undefined;
declare const bigbase: bigint;
declare const biglit = 22n;
declare const symbase: symbol;
declare const nev: never;
declare const templateLit: `aaa${string}`;
declare const mappingLit: Lowercase<string>;
export declare class Foo {
    [sym](): 1;
    [num](): 2;
    [str](): 3;
    [union](): 4;
    [NumEnum.A](): 5;
    [StrEnum.A](): 6;
    [MixEnum.A](): 7;
    [MixEnum.B](): 8;
    [anything](): 9;
    [unk](): 10;
    [basestr](): 11;
    [basenum](): 12;
    [bool](): 13;
    [t](): 14;
    [f](): 15;
    [n](): 16;
    [u](): 17;
    [bigbase](): 18;
    [biglit](): 19;
    [symbase](): 20;
    [nev](): 21;
    [templateLit](): 22;
    [mappingLit](): 23;
}
export declare const results: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, any, 22, 23];
export {};
