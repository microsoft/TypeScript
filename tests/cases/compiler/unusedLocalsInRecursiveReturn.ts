// @strict: true
// @noEmit: true
// @noUnusedLocals: true

function recursive(arg: string, other: string) {
    const someLocalVar = arg + other;
    return recursive(someLocalVar, arg);
}