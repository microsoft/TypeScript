//// [tests/cases/compiler/reactNamespaceJSXEmit.tsx] ////

//// [reactNamespaceJSXEmit.tsx]
declare var myReactLib: any;
declare var foo: any;
declare var Bar: any;
declare var _Bar: any;
declare var x: any;

<foo data/>;
<Bar x={x} />;
<x-component />;
<Bar {...x} />;
<Bar { ...x } y={2} />;
<_Bar { ...x } />;


//// [reactNamespaceJSXEmit.js]
myReactLib.createElement("foo", { data: true });
myReactLib.createElement(Bar, { x: x });
myReactLib.createElement("x-component", null);
myReactLib.createElement(Bar, Object.assign({}, x));
myReactLib.createElement(Bar, Object.assign({}, x, { y: 2 }));
myReactLib.createElement(_Bar, Object.assign({}, x));
