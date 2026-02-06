// @target: es2015
function foo<T extends T>(x: T): number {
    return x;
}
 
