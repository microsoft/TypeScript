// @target: es5

// https://github.com/microsoft/TypeScript/issues/24554
class Test24554 {
    get property(): number { return 1; }
}
function test24554(x: Test24554) {
    return x.property();
}
