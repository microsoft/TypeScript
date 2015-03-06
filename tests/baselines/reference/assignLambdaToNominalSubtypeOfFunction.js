//// [assignLambdaToNominalSubtypeOfFunction.ts]
interface IResultCallback extends Function {
    x: number;
}

function fn(cb: IResultCallback) { }

fn((a, b) => true);
fn(function (a, b) { return true; })


//// [assignLambdaToNominalSubtypeOfFunction.js]
function fn(cb) { }
fn(function (a, b) { return true; });
fn(function (a, b) { return true; });
