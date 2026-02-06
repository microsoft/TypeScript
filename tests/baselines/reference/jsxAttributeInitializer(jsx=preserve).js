//// [tests/cases/conformance/jsx/jsxAttributeInitializer.ts] ////

//// [a.tsx]
declare var React: any;

<div>
    <div attr=<div /> />
    <div attr=<div>foo</div> />
    <div attr=<><div>foo</div></> />
    <div attr= />
</div>


//// [a.jsx]
"use strict";
<div>
    <div attr=<div />/>
    <div attr=<div>foo</div>/>
    <div attr=<><div>foo</div></>/>
    <div attr/>
</div>;
