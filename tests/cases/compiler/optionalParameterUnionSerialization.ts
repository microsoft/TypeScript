// @strict: true
// @declaration: true
// @noTypesAndSymbols: true

type u = 1 | 2 | 3 | 4 | 5; 

export const o = {
    mandatory(arg: u): void {arg},
    optional(arg?: u): void {arg},
};
