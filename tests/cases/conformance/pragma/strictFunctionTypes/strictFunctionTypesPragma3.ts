// @filename: file1.ts
// @ts-strictFunctionTypes
export const a = (a: number) => 0;
export const b = (a: unknown) => 0;

// @filename: file2.ts
// @ts-strictFunctionTypes false
export const a = (a: number) => 0;
export const b = (a: unknown) => 0;

// @filename: file3.ts
import {a as a1, b as b1} from "./file1";
import {a as a2, b as b2} from "./file2";

declare var numberArgStrict: typeof a1;
declare var numberArgLoose: typeof a2;
declare var unknownArgStrict: typeof b1;
declare var unknownArgLoose: typeof b2;

numberArgStrict = unknownArgStrict;
unknownArgStrict = numberArgStrict;

numberArgStrict = numberArgLoose;
numberArgLoose = numberArgStrict;

numberArgStrict = unknownArgLoose;
unknownArgLoose = numberArgStrict;

numberArgLoose = unknownArgLoose;
unknownArgLoose = numberArgLoose;

numberArgLoose = unknownArgStrict;
unknownArgStrict = numberArgLoose;
