// @declaration: true
// @skipLibCheck: false
// @isolatedDeclarationFixedDiffReason: TODO: Sourcemap seems miss-aligned

export const foo = <T,>(x: T) => {
	const inner = <T,>(y: T) => [x, y] as const;
	return inner;
}
