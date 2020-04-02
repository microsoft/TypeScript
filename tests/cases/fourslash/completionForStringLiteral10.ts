/// <reference path='fourslash.ts'/>

////type As = 'arf' | 'abacus' | 'abaddon';
////let a: As;
////if ('[|/**/|]' != a

verify.completions({ marker: "", exact: ["arf", "abacus", "abaddon"].map(name => ({
    name,
    replacementSpan: test.ranges()[0]
})) });
