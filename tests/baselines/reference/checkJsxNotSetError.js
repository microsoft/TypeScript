//// [tests/cases/compiler/checkJsxNotSetError.ts] ////

//// [foo.jsx]
const Foo = () => (
    <div>foo</div>
);
export default Foo;

//// [bar.jsx]
import Foo from '/foo';
const a = <Foo />

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo = function () { return (<div>foo</div>); };
exports.default = Foo;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("/foo");
var a = <foo_1.default />;
