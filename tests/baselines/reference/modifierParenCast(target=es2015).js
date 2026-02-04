//// [tests/cases/compiler/modifierParenCast.ts] ////

//// [modifierParenCast.ts]
let readonly: any = undefined;
let override: any = undefined;
let out: any = undefined;
let declare: any = undefined;

export const a = (readonly as number);
export const b = (override as number);
export const c = (out as number);
export const d = (declare as number);

//// [modifierParenCast.js]
let readonly = undefined;
let override = undefined;
let out = undefined;
let declare = undefined;
export const a = readonly;
export const b = override;
export const c = out;
export const d = declare;
