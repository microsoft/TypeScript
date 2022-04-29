//// [undefinedArgumentInference.ts]
function foo1<T>(f1: { x: T; y: T }): T {

   return undefined;

}

var z1 = foo1({ x: undefined, y: undefined }); 


//// [undefinedArgumentInference.js]
function foo1(f1) {
    return undefined;
}
var z1 = foo1({ x: undefined, y: undefined });
