//// [assignLambdaToNominalSubtypeOfFunction.js]
function fn(cb) {
}

fn(function (a, b) {
    return true;
});
fn(function (a, b) {
    return true;
});
