//// [tests/cases/conformance/types/contextualTypes/jsxAttributes/contextuallyTypedStringLiteralsInJsxAttributes01.tsx] ////

//// [contextuallyTypedStringLiteralsInJsxAttributes01.tsx]
namespace JSX {
    export interface IntrinsicElements {
        span: {};
    }
    export interface Element {
		something?: any;
    }
}

const FooComponent = (props: { foo: "A" | "B" | "C" }) => <span>{props.foo}</span>;

<FooComponent foo={"A"} />;
<FooComponent foo="A"   />;

<FooComponent foo={"f"} />;
<FooComponent foo="f"   />;

//// [contextuallyTypedStringLiteralsInJsxAttributes01.jsx]
var FooComponent = function (props) { return <span>{props.foo}</span>; };
<FooComponent foo={"A"}/>;
<FooComponent foo="A"/>;
<FooComponent foo={"f"}/>;
<FooComponent foo="f"/>;


//// [contextuallyTypedStringLiteralsInJsxAttributes01.d.ts]
declare namespace JSX {
    interface IntrinsicElements {
        span: {};
    }
    interface Element {
        something?: any;
    }
}
declare const FooComponent: (props: {
    foo: "A" | "B" | "C";
}) => JSX.Element;
