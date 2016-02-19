// @jsx: preserve
// @declaration: true

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