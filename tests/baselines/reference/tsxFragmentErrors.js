//// [tests/cases/conformance/jsx/tsxFragmentErrors.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

<>hi</div> // Error

<>eof   // Error

//// [file.js]
React.createElement(React.Fragment, null, "hi");
div > // Error
    React.createElement(React.Fragment, null, "eof   // Error");
