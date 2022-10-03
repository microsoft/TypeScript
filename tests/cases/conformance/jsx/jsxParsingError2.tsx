//@jsx: preserve

//@filename: file.tsx
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

// @filename: Error1.tsx
// Issue error about missing span closing tag, not missing div closing tag
let x1 = <div><span></div>;

// @filename: Error2.tsx
let x2 = <div></span>;


// @filename: Error3.tsx
let x3 = <div>;


// @filename: Error4.tsx
let x4 = <div><div></span>;

// @filename: Error5.tsx
let x5 = <div><span>

