// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function propertyAccess0() {
    y = await x.a;
}

async function propertyAccess1() {
    y = (await x).a;
}

async function callExpression0() {
    await x(y, z);
}