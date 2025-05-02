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
React.createElement("div", null,
    React.createElement("div", { attr: React.createElement("div", null) }),
    React.createElement("div", { attr: React.createElement("div", null, "foo") }),
    React.createElement("div", { attr: React.createElement(React.Fragment, null,
            React.createElement("div", null, "foo")) }),
    React.createElement("div", { attr: true }));
