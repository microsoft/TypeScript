// @jsx: preserve


namespace JSX {
    export interface IntrinsicElements {
        span: {};
    }
    export interface Element {
		something?: any;
    }
}

const Foo = (props: { foo: "A" | "B" | "C" }) => <span>{props.foo}</span>;

Foo({
    foo: "B"
});

<Foo foo="B" />
