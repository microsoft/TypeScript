//// [tests/cases/compiler/constDeclarations.ts] ////

//// [constDeclarations.ts]
// No error
const c1 = false;
const c2: number = 23;
const c3 = 0, c4 :string = "", c5 = null;


for(const c4 = 0; c4 < 9; ) { break; }


for(const c5 = 0, c6 = 0; c5 < c6; ) { break; }

//// [constDeclarations.js]
// No error
const c1 = false;
const c2 = 23;
const c3 = 0, c4 = "", c5 = null;
for (const c4 = 0; c4 < 9;) {
    break;
}
for (const c5 = 0, c6 = 0; c5 < c6;) {
    break;
}


//// [constDeclarations.d.ts]
declare const c1 = false;
declare const c2: number;
declare const c3 = 0, c4: string, c5: any;
