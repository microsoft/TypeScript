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
<foo data/>;
<Bar x={x}/>;
<x-component />;
<Bar {...x}/>;
<Bar {...x} y={2}/>;
<_Bar {...x}/>;
