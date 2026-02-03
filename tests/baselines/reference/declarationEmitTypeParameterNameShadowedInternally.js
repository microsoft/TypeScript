//// [tests/cases/compiler/declarationEmitTypeParameterNameShadowedInternally.ts] ////

//// [declarationEmitTypeParameterNameShadowedInternally.ts]
export const foo = <T,>(x: T) => {
	const inner = <T,>(y: T) => [x, y] as const;
	return inner;
}


//// [declarationEmitTypeParameterNameShadowedInternally.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
var foo = function (x) {
    var inner = function (y) { return [x, y]; };
    return inner;
};
exports.foo = foo;


//// [declarationEmitTypeParameterNameShadowedInternally.d.ts]
export declare const foo: <T>(x: T) => <T_1>(y: T_1) => readonly [T, T_1];
