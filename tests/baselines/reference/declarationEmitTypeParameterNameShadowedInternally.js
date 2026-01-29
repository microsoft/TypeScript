//// [tests/cases/compiler/declarationEmitTypeParameterNameShadowedInternally.ts] ////

//// [declarationEmitTypeParameterNameShadowedInternally.ts]
export const foo = <T,>(x: T) => {
	const inner = <T,>(y: T) => [x, y] as const;
	return inner;
}


//// [declarationEmitTypeParameterNameShadowedInternally.js]
export const foo = (x) => {
    const inner = (y) => [x, y];
    return inner;
};


//// [declarationEmitTypeParameterNameShadowedInternally.d.ts]
export declare const foo: <T>(x: T) => <T_1>(y: T_1) => readonly [T, T_1];
