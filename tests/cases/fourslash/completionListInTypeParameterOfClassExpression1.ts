/// <reference path='fourslash.ts'/>

////var C0 = class D</*0*/
////var C1 = class D</*1*/T> {}
////var C2 = class D<T, /*2*/
////var C3 = class D<T, /*3*/U>{}
////var C4 = class D<T extends /*4*/>{}

verify.completions({ marker: ["0", "1", "2", "3"], exact: undefined });
verify.completions({ marker: "4", exact: completion.globalTypesPlus(["D"]) });
