//// [tests/cases/compiler/declarationEmitMergedAliasWithConst.ts] ////

//// [declarationEmitMergedAliasWithConst.ts]
export const Color = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue"
} as const

export type Color = typeof Color
export type Colors = Color[keyof Color]

//// [declarationEmitMergedAliasWithConst.js]
export const Color = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue"
};


//// [declarationEmitMergedAliasWithConst.d.ts]
export declare const Color: {
    readonly Red: "Red";
    readonly Green: "Green";
    readonly Blue: "Blue";
};
export type Color = typeof Color;
export type Colors = Color[keyof Color];
