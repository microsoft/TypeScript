//// [tests/cases/compiler/declarationEmitNestedAnonymousMappedType.ts] ////

//// [declarationEmitNestedAnonymousMappedType.ts]
export function enumFromStrings<const Members extends readonly string[]>() {
    type Part1 = {
        [key in keyof Members as Members[key] extends string
        ? Members[key]
        : never]: Members[key];
    };
    type Part2 = { [Property in keyof Part1]: Part1[Property] };
    return Object.create(null) as Part2;
}


//// [declarationEmitNestedAnonymousMappedType.js]
export function enumFromStrings() {
    return Object.create(null);
}


//// [declarationEmitNestedAnonymousMappedType.d.ts]
export declare function enumFromStrings<const Members extends readonly string[]>(): { [Property in keyof { [key in keyof Members as Members[key] extends string ? Members[key] : never]: Members[key]; }]: { [key in keyof Members as Members[key] extends string ? Members[key] : never]: Members[key]; }[Property]; };
