//// [contextuallyTypedStringLiteralsInJsxAttributes01.tsx]

namespace JSX {
    interface IntrinsicElements {
        span: {};
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
}
declare const FooComponent: (props: {
    foo: "A" | "B" | "C";
}) => any;
