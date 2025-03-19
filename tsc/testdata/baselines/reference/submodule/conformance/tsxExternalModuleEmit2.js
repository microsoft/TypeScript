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
Object.defineProperty(exports, "__esModule", { value: true });
const mod_1 = require("mod");
// Should see mod_1['default'] in emit here
<Foo handler={mod_1.default}></Foo>;
// Should see mod_1['default'] in emit here
<Foo {...mod_1.default}></Foo>;
