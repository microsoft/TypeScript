// @declaration: true
// @skipLibCheck: false
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

export const foo = <T,>(x: T) => {
	const inner = <T,>(y: T) => [x, y] as const;
	return inner;
}
