// @declaration: true
// @skipLibCheck: false

export const foo = <T,>(x: T) => {
	const inner = <T,>(y: T) => [x, y] as const;
	return inner;
}
