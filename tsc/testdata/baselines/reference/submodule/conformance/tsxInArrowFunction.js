//// [tests/cases/conformance/jsx/tsxInArrowFunction.tsx] ////

//// [tsxInArrowFunction.tsx]
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        div: {
            text?: string;
        }
    }
}


// didn't work
<div>{() => <div text="wat" />}</div>;

// didn't work
<div>{x => <div text="wat" />}</div>;

// worked
<div>{() => (<div text="wat" />)}</div>;

// worked (!)
<div>{() => <div text="wat"></div>}</div>;


//// [tsxInArrowFunction.jsx]
<div>{() => <div text="wat"/>}</div>;
<div>{x => <div text="wat"/>}</div>;
<div>{() => (<div text="wat"/>)}</div>;
<div>{() => <div text="wat"></div>}</div>;
