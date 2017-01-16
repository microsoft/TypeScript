// @jsx: preserve

declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
	}
}

const t = {tag:'h1'}
const foo = <t.tag/>  // No error