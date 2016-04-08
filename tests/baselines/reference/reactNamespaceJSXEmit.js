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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var s = arguments[i];
        for (var p in s) if (s.hasOwnProperty(p)) t[p] = s[p];
    }
    return t;
};
myReactLib.createElement("foo", {data: true});
myReactLib.createElement(Bar, {x: x});
myReactLib.createElement("x-component", null);
myReactLib.createElement(Bar, __assign({}, x));
myReactLib.createElement(Bar, __assign({}, x, {y: 2}));
