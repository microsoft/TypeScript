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
React.createElement(React.Fragment, null, "hi") // Error
    , // Error
        React.createElement(React.Fragment, null, "eof   // Error");
