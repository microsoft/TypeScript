//// [tests/cases/compiler/undefinedAssignableToGenericMappedIntersection.ts] ////

//// [undefinedAssignableToGenericMappedIntersection.ts]
type Errors<T> = { [P in keyof T]: string | undefined } & {all: string | undefined};
function foo<T>() {
    let obj!: Errors<T>
    let x!: keyof T;
    obj[x] = undefined;
}


//// [undefinedAssignableToGenericMappedIntersection.js]
function foo() {
    let obj;
    let x;
    obj[x] = undefined;
}
