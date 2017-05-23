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
// didn't work
<div>{function () { return <div text="wat"/>; }}</div>;
// didn't work
<div>{function (x) { return <div text="wat"/>; }}</div>;
// worked
<div>{function () { return (<div text="wat"/>); }}</div>;
// worked (!)
<div>{function () { return <div text="wat"></div>; }}</div>;
