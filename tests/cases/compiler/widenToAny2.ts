function foo3<T>(x: T[]): T {
    return undefined;
}
var z3:number = foo3([undefined, "def"]);  // Type is any, but should be string
