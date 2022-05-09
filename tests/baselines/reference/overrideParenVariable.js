//// [overrideParenVariable.ts]

let override: any;
export const a = (override as number);

//// [overrideParenVariable.js]

export const a = override;
