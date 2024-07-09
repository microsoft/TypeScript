
function foo1<T>(f1: { x: T; y: T }): T {
    return undefined;
}
var z1: number = foo1({ x: undefined, y: "def" });  // Best common type is any
