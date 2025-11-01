/// <reference path='fourslash.ts'/>

////type As = 'arf' | 'abacus' | 'abaddon';
////let a: As;
////if (a === '/**/

verify.completions({ marker: "", exact: ["abacus", "abaddon", "arf"] });
