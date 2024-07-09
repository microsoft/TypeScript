//@module: amd
// @Filename: moduleAliasAsFunctionArgument_0.ts
export var x: number;

// @Filename: moduleAliasAsFunctionArgument_1.ts
///<reference path='moduleAliasAsFunctionArgument_0.ts'/>
import a = require('moduleAliasAsFunctionArgument_0');

function fn(arg: { x: number }) {
}

a.x; // OK
fn(a); // Error: property 'x' is missing from 'a'
