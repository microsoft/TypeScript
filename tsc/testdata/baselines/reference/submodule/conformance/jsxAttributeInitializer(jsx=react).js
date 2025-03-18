//// [tests/cases/conformance/jsx/jsxAttributeInitializer.ts] ////

//// [a.tsx]
declare var React: any;

<div>
    <div attr=<div /> />
    <div attr=<div>foo</div> />
    <div attr=<><div>foo</div></> />
    <div attr= />
</div>


//// [a.js]
<div>
    <div attr=<div />/>
    <div attr=<div>foo</div>/>
    <div attr=<><div>foo</div></>/>
    <div attr/>
</div>;
