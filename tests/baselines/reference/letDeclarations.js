//// [tests/cases/compiler/letDeclarations.ts] ////

//// [letDeclarations.ts]
let l1;
let l2: number;
let l3, l4, l5 :string, l6;

let l7 = false;
let l8: number = 23;
let l9 = 0, l10 :string = "", l11 = null;

for(let l11 in {}) { }

for(let l12 = 0; l12 < 9; l12++) { }


//// [letDeclarations.js]
let l1;
let l2;
let l3, l4, l5, l6;
let l7 = false;
let l8 = 23;
let l9 = 0, l10 = "", l11 = null;
for (let l11 in {}) { }
for (let l12 = 0; l12 < 9; l12++) { }


//// [letDeclarations.d.ts]
declare let l1: any;
declare let l2: number;
declare let l3: any, l4: any, l5: string, l6: any;
declare let l7: boolean;
declare let l8: number;
declare let l9: number, l10: string, l11: any;
