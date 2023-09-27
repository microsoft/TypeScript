/// <reference path="fourslash.ts" />

//// type Value<P extends string> = `var(--\\\\, ${P})`
//// export const value: Value<'one' | 'two'> = "/*1*/"
////
//// export const test: `\ntest\n` = '/*2*/'
////
//// export const doubleQuoted1: `"double-quoted"` = '/*3*/'
//// export const doubleQuoted2: `"double-quoted"` = "/*4*/"
////
//// export const singleQuoted2: `'single-quoted'` = "/*5*/"
//// export const singleQuoted2: `'single-quoted'` = '/*6*/'
////
//// export const backtickQuoted1: '`backtick-quoted`' = "/*7*/"
//// export const backtickQuoted2: '`backtick-quoted`' = `/*8*/`

verify.completions({ marker: "1", exact: ["var(--\\\\\\\\, one)", "var(--\\\\\\\\, two)"] });
verify.completions({ marker: "2", exact: ["\\ntest\\n"] });
verify.completions({ marker: "3", exact: ['"double-quoted"'] });
verify.completions({ marker: "4", exact: ['\\\"double-quoted\\\"'] });
verify.completions({ marker: "5", exact: ["'single-quoted'"] });
verify.completions({ marker: "6", exact: ["\\'single-quoted\\'"] });
verify.completions({ marker: "7", exact: ["`backtick-quoted`"] });
verify.completions({ marker: "8", exact: ["\\`backtick-quoted\\`"] });
