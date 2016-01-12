//// [reactNamespaceJSXEmit.tsx]

declare var myReactLib: any;
declare var foo: any;
declare var Bar: any;
declare var x: any;

<foo data/>;
<Bar x={x} />;
<x-component />;
<Bar {...x} />;
<Bar { ...x } y={2} />;


//// [reactNamespaceJSXEmit.js]
myReactLib.createElement("foo", {data: true});
myReactLib.createElement(Bar, {x: x});
myReactLib.createElement("x-component", null);
myReactLib.createElement(Bar, myReactLib.__spread({}, x));
myReactLib.createElement(Bar, myReactLib.__spread({}, x, {y: 2}));
