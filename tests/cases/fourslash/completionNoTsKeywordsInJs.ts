///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: Foo.js
// @noLib: true
//// /*1*/
//// class C { 
////   /*2*/
////   constructor( /*5*/ )
//// }
////
//// function foo() { /*3*/ } 
//// interface I { /*4*/ }
//// 
verify.completions(
  { marker: ['1'], excludes: ['type', 'enum', 'abstract', 'as', 'any', 'infer', 'is', 'keyof', 'module', 'namespace', 'never', 'readonly', 'unique', 'unknown'] },
  { marker: ['2'], excludes: ['readonly', 'abstract'], isNewIdentifierLocation: true },
  { marker: ['3'], excludes: ['enum'] },
  { marker: ['4'], excludes: ['readonly'], isNewIdentifierLocation: true },
  { marker: ['5'], excludes: ['readonly'], isNewIdentifierLocation: true }
);