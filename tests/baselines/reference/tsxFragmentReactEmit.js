//// [tests/cases/conformance/jsx/tsxFragmentReactEmit.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

<></>; // no whitespace
<    ></   >; // lots of whitespace
< /*starting wrap*/ ></ /*ending wrap*/>; // comments in the tags
<>hi</>; // text inside
<><span>hi</span><div>bye</div></>; // children
<><span>1</span><><span>2.1</span><span>2.2</span></><span>3</span></>; // nested fragments
<>#</>; // # would cause scanning error if not in jsxtext

//// [file.js]
React.createElement(React.Fragment, null); // no whitespace
React.createElement(React.Fragment, null); // lots of whitespace
React.createElement(React.Fragment, null); // comments in the tags
React.createElement(React.Fragment, null, "hi"); // text inside
React.createElement(React.Fragment, null,
    React.createElement("span", null, "hi"),
    React.createElement("div", null, "bye")); // children
React.createElement(React.Fragment, null,
    React.createElement("span", null, "1"),
    React.createElement(React.Fragment, null,
        React.createElement("span", null, "2.1"),
        React.createElement("span", null, "2.2")),
    React.createElement("span", null, "3")); // nested fragments
React.createElement(React.Fragment, null, "#"); // # would cause scanning error if not in jsxtext
