//// [tests/cases/conformance/jsx/tsxExternalModuleEmit2.tsx] ////

//// [modules.d.ts]

declare module 'mod' {
  var y: any;
  export default y;
}

//// [app.tsx]
import Main from 'mod';
declare var Foo, React;
// Should see mod_1['default'] in emit here
<Foo handler={Main}></Foo>;
// Should see mod_1['default'] in emit here
<Foo {...Main}></Foo>;



//// [app.js]
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var i = 1, n = arguments.length; i < n; i++) {
        var s = arguments[i];
        if (s != null) for (var p in s) if (s.hasOwnProperty(p)) t[p] = s[p];
    }
    return t;
};
var mod_1 = require('mod');
// Should see mod_1['default'] in emit here
React.createElement(Foo, {handler: mod_1["default"]});
// Should see mod_1['default'] in emit here
React.createElement(Foo, __assign({}, mod_1["default"]));
