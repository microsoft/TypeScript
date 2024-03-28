//// [tests/cases/conformance/jsx/tsxReactEmit3.tsx] ////

//// [test.tsx]
declare module JSX { interface Element { } }
declare var React: any;

declare var Foo, Bar, baz;

<Foo> <Bar> q </Bar> <Bar/>   s <Bar/><Bar/></Foo>;

//// [test.js]
React.createElement(Foo, null,
    " ",
    React.createElement(Bar, null, " q "),
    " ",
    React.createElement(Bar, null),
    "   s ",
    React.createElement(Bar, null),
    React.createElement(Bar, null));
