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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
myReactLib.createElement("foo", { data: true });
myReactLib.createElement(Bar, { x: x });
myReactLib.createElement("x-component", null);
myReactLib.createElement(Bar, __assign({}, x));
myReactLib.createElement(Bar, __assign({}, x, { y: 2 }));
myReactLib.createElement(_Bar, __assign({}, x));
