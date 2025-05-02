//// [tests/cases/compiler/genericFunctions3.ts] ////

//// [genericFunctions3.ts]
interface Query<T> {
    foo(x: string): Query<T[]>;
}
 
function from<T>(arg: boolean): Query<T>; // was Error: Overload signature is not compatible with function definition.
function from<T>(arg: any): Query<T> {
    return undefined;
}


//// [genericFunctions3.js]
function from(arg) {
    return undefined;
}
