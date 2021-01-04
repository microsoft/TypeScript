//// [declarationEmitNoIntersectionTypeVariableLeak.ts]
type Wrap<A> = {
    nest: A
};
interface PreventInliningInDeclarationEmit {
}
export type PublicWrap<X, Y = {}> = Wrap<Y> & PreventInliningInDeclarationEmit;
export function fn<T>(arg: T): PublicWrap<T> {
    return { nest: arg }
}
const nested = fn({ foo: 1 });   // Syntax Error in declaration emit here
export default nested;

//// [declarationEmitNoIntersectionTypeVariableLeak.js]
"use strict";
exports.__esModule = true;
exports.fn = void 0;
function fn(arg) {
    return { nest: arg };
}
exports.fn = fn;
var nested = fn({ foo: 1 }); // Syntax Error in declaration emit here
exports["default"] = nested;


//// [declarationEmitNoIntersectionTypeVariableLeak.d.ts]
declare type Wrap<A> = {
    nest: A;
};
interface PreventInliningInDeclarationEmit {
}
export declare type PublicWrap<X, Y = {}> = Wrap<Y> & PreventInliningInDeclarationEmit;
export declare function fn<T>(arg: T): PublicWrap<T>;
declare const nested: PublicWrap<unknown, {}>;
export default nested;
