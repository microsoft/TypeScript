// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var v = { [await]: foo }