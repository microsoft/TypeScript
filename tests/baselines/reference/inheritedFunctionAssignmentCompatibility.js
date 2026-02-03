//// [tests/cases/compiler/inheritedFunctionAssignmentCompatibility.ts] ////

//// [inheritedFunctionAssignmentCompatibility.ts]
interface IResultCallback extends Function { }

function fn(cb: IResultCallback) { }

fn((a, b) => true);
fn(function (a, b) { return true; })



//// [inheritedFunctionAssignmentCompatibility.js]
function fn(cb) { }
fn(function (a, b) { return true; });
fn(function (a, b) { return true; });
