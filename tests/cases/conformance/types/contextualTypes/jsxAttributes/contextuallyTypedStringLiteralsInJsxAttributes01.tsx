// @jsx: preserve
// @declaration: true
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

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