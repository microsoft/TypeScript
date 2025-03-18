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
const foo = (x) => {
    const inner = (y) => [x, y];
    return inner;
};
exports.foo = foo;
