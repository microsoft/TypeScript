// @declaration: true
// @strict: true
// @target: es2020

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


