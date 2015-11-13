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
var mod_1 = require('mod');
// Should see mod_1['default'] in emit here
React.createElement(Foo, {handler: mod_1["default"]});
// Should see mod_1['default'] in emit here
React.createElement(Foo, React.__spread({}, mod_1["default"]));
