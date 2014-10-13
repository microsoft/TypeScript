//// [constDeclarations.ts]

// No error
const c1 = false;
const c2: number = 23;
const c3 = 0, c4 :string = "", c5 = null;


//// [constDeclarations.js]
// No error
const c1 = false;
const c2 = 23;
const c3 = 0, c4 = "", c5 = null;


//// [constDeclarations.d.ts]
declare const c1: boolean;
declare const c2: number;
declare const c3: number, c4: string, c5: any;
