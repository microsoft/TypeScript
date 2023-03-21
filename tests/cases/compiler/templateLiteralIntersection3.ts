// @strict: true
// @noEmit: true

type Path = string & { _pathBrand: any };
declare const path: Path;

declare const options1: { prop: number; } & { [k: string]: boolean; };

options1[`foo`] = false;

options1[`foo/${path}`] = false;


// Lowercase<`foo/${Path}`> => `foo/${Lowercase<Path>}`
declare const lowercasePath: Lowercase<`foo/${Path}`>;

options1[lowercasePath] = false;
