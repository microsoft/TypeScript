///<reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @Filename: Foo.js
// @noLib: true
////// All keywords
//// /*1*/
////
//// class C {
////// ClassElementKeywords
////   /*2*/
////
////// ConstructorParameterKeywords
////   constructor( /*4*/ )
//// }
////
////// FunctionLikeBodyKeywords
//// function foo() { /*3*/ } 
//// 
const tsKeywords = ['type', 'enum', 'abstract', 'any', 'infer', 'is', 'keyof', 'module', 'namespace', 'never', 'readonly', 'unique', 'unknown'];
verify.completions(
  {
    marker: ['1'],
    exact: ['foo', 'C', 'undefined' ,...completion.globalKeywords.filter(keyword => tsKeywords.indexOf(keyword.name) === -1)],
  },
  {
    marker: ['2'],
    exact: completion.classElementKeywords.filter(keyword => ['readonly', 'abstract'].indexOf(keyword.name) === -1),
    isNewIdentifierLocation: true 
  },
  {
    marker: ['3'],
    includes: ["async", "await"],
    excludes: ["public", "private", "protected", "constructor", "readonly", "static", "abstract", "get", "set", ...tsKeywords],
  },
  {
    marker: ['4'],
    exact: ['private', 'protected', 'public'],
    isNewIdentifierLocation: true 
  }
);