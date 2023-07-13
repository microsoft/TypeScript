//// [tests/cases/conformance/jsx/tsxDynamicTagName6.tsx] ////

//// [tsxDynamicTagName6.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
	}
}

const t = {tag:'h1'}
const foo = <t.tag/>  // No error

//// [tsxDynamicTagName6.jsx]
var t = { tag: 'h1' };
var foo = <t.tag />; // No error
