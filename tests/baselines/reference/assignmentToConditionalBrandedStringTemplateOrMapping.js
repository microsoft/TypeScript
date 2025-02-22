//// [tests/cases/compiler/assignmentToConditionalBrandedStringTemplateOrMapping.ts] ////

//// [assignmentToConditionalBrandedStringTemplateOrMapping.ts]
let a: (<T>() => T extends `${'a' & { a: 1 }}` ? 1 : 2) = null!;
let b: (<T>() => T extends `${'a' & { a: 1 }}` ? 1 : 2) = null!;

a = b;

let c: (<T>() => T extends Uppercase<'a' & { a: 1 }> ? 1 : 2) = null!;
let d: (<T>() => T extends Uppercase<'a' & { a: 1 }> ? 1 : 2) = null!;

c = d;


//// [assignmentToConditionalBrandedStringTemplateOrMapping.js]
var a = null;
var b = null;
a = b;
var c = null;
var d = null;
c = d;
