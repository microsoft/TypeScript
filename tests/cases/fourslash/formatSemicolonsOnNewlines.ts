/// <reference path="fourslash.ts" />

// @Filename: a.ts
////declare opt: boolean | undefined;
////const a = opt
////    || opt
////    || opt
////    ;

// @Filename: b.ts
////declare opt: boolean | undefined;
////const b = opt
////    && opt
////    && opt

// @Filename: c.ts
////declare opt: boolean | undefined;
////const c = opt
////    ?? opt
////    ?? opt
////    ;

// @Filename: d.ts
////declare opt: boolean | undefined;
////const d = opt
////    ? 1
////    : 2
////    ;

// @Filename: e.ts
////declare opt: boolean | undefined;
////const e = opt
////    ? 1 : opt
////    ? 2 :
////    3
////    ;

// @Filename: f.ts
////declare opt: boolean | undefined;
////const f = opt
////    || opt
////    || opt
////;[1, 2, 3]

// @Filename: g.ts
////declare opt: boolean | undefined;
////const g = opt
////    ?? opt
////    ?? opt;
////;[1, 2, 3]

// @Filename: h.ts
////declare opt: boolean | undefined;
////const h = opt
////    ? 1
////    : 2
////;[1, 2, 3]

// @Filename: i.ts
////declare opt: boolean | undefined;
////const i = opt
////    ? 1 : opt
////    ? 2 :
////    3
////;[1, 2, 3]

// @Filename: a2.ts
////type a =
////    | 1
////    | 2
////    | 3
////    ;

// @Filename: b2.ts
////type b =
////    & 1
////    & 2
////    & 3

// @Filename: c2.ts
////type a = 1 | 2 | 3;
////type c = a extends 1
////    ? 1
////    : 2
////    ;

// @Filename: d2.ts
////type a = 1 | 2 | 3;
////type d = a extends 1
////    ? 1 : a extends 1
////    ? 2 :
////    3
////    ;

// @Filename: e2.ts
////type e =
////    | 1
////    | 2
////    | 3
////;[1, 2, 3]

// @Filename: f2.ts
////type f =
////    & 1
////    & 2
////    & 3;
////;[1, 2, 3]

// @Filename: g2.ts
////type a = 1 | 2 | 3;
////type g = a extends 1
////    ? 1
////    : 2
////;[1, 2, 3]

// @Filename: h2.ts
////type a = 1 | 2 | 3;
////type h = a extends 1
////    ? 1 : a extends 1
////    ? 2 :
////    3
////;[1, 2, 3]

// @Filename: a3.ts
////class a {
////    ["a"] = {}
////    ["b"]
////    c: string
////    m() { }
////    ;["d"] = {}
////    ;["e"]
////}

//#region SemicolonPreference.Insert
format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Insert });
let expected: Record<string, string> = {};
expected.a = `declare opt: boolean | undefined;
const a = opt
    || opt
    || opt
    ;`;

expected.b = `declare opt: boolean | undefined;
const b = opt
    && opt
    && opt;`;

expected.c = `declare opt: boolean | undefined;
const c = opt
    ?? opt
    ?? opt
    ;`;

expected.d = `declare opt: boolean | undefined;
const d = opt
    ? 1
    : 2
    ;`;

expected.e = `declare opt: boolean | undefined;
const e = opt
    ? 1 : opt
        ? 2 :
        3
    ;`;
    
expected.f = `declare opt: boolean | undefined;
const f = opt
    || opt
    || opt
    ;[1, 2, 3];`;
    
expected.g = `declare opt: boolean | undefined;
const g = opt
    ?? opt
    ?? opt;
;[1, 2, 3];`;

expected.h = `declare opt: boolean | undefined;
const h = opt
    ? 1
    : 2
    ;[1, 2, 3];`;
    
expected.i = `declare opt: boolean | undefined;
const i = opt
    ? 1 : opt
        ? 2 :
        3
    ;[1, 2, 3];`;
    
expected.a2 = `type a =
    | 1
    | 2
    | 3
    ;`;
    
expected.b2 = `type b =
    & 1
    & 2
    & 3;`;

expected.c2 = `type a = 1 | 2 | 3;
type c = a extends 1
    ? 1
    : 2
    ;`;

expected.d2 = `type a = 1 | 2 | 3;
type d = a extends 1
    ? 1 : a extends 1
    ? 2 :
    3
    ;`;

expected.e2 = `type e =
    | 1
    | 2
    | 3
    ;[1, 2, 3];`;

expected.f2 = `type f =
    & 1
    & 2
    & 3;
;[1, 2, 3];`;

expected.g2 = `type a = 1 | 2 | 3;
type g = a extends 1
    ? 1
    : 2
    ;[1, 2, 3];`;
    
expected.h2 = `type a = 1 | 2 | 3;
type h = a extends 1
    ? 1 : a extends 1
    ? 2 :
    3
    ;[1, 2, 3];`;
    
expected.a3 = `class a {
    ["a"] = {}
    ["b"];
    c: string;
    m() { }
    ;["d"] = {}
        ;["e"];
}`;

for (const [filename, text] of Object.entries(expected)) {
    goTo.file(`${filename}.ts`);
    format.document();
    verify.currentFileContentIs(text);
}
//#endregion

//#region SemicolonPreference.Remove
format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Remove });
expected = {};

expected.a = `declare opt: boolean | undefined
const a = opt
    || opt
    || opt
`;

expected.b = `declare opt: boolean | undefined
const b = opt
    && opt
    && opt`;
    
expected.c = `declare opt: boolean | undefined
const c = opt
    ?? opt
    ?? opt
`;

expected.d = `declare opt: boolean | undefined
const d = opt
    ? 1
    : 2
`;

expected.e = `declare opt: boolean | undefined
const e = opt
    ? 1 : opt
        ? 2 :
        3
`;

expected.f = `declare opt: boolean | undefined
const f = opt
    || opt
    || opt
;[1, 2, 3]`;

expected.g = `declare opt: boolean | undefined
const g = opt
    ?? opt
    ?? opt;
;[1, 2, 3]`;

expected.h = `declare opt: boolean | undefined
const h = opt
    ? 1
    : 2
;[1, 2, 3]`;

expected.i = `declare opt: boolean | undefined
const i = opt
    ? 1 : opt
        ? 2 :
        3
;[1, 2, 3]`;

expected.a2 = `type a =
    | 1
    | 2
    | 3
`;

expected.b2 = `type b =
    & 1
    & 2
    & 3`;
    
expected.c2 = `type a = 1 | 2 | 3
type c = a extends 1
    ? 1
    : 2
`;

expected.d2 = `type a = 1 | 2 | 3
type d = a extends 1
    ? 1 : a extends 1
    ? 2 :
    3
`;

expected.e2 = `type e =
    | 1
    | 2
    | 3
;[1, 2, 3]`;

expected.f2 = `type f =
    & 1
    & 2
    & 3;
;[1, 2, 3]`;

expected.g2 = `type a = 1 | 2 | 3
type g = a extends 1
    ? 1
    : 2
;[1, 2, 3]`;

expected.h2 = `type a = 1 | 2 | 3
type h = a extends 1
    ? 1 : a extends 1
    ? 2 :
    3
;[1, 2, 3]`;
    
expected.a3 = `class a {
    ["a"] = {}
    ["b"];
    c: string
    m() { }
    ;["d"] = {}
    ;["e"]
}`;

for (const [filename, text] of Object.entries(expected)) {
    goTo.file(`${filename}.ts`);
    format.document();
    verify.currentFileContentIs(text);
}
//#endregion
