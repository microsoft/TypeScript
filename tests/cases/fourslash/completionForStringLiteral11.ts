/// <reference path='fourslash.ts'/>

////type As = 'arf' | 'abacus' | 'abaddon';
////let a: As;
////switch (a) {
////    case '[|/**/|]
////}

verify.completions({ marker: "", exact: ["abacus", "abaddon", "arf"] });
