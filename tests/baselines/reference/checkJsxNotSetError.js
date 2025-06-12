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
const Foo = () => (<div>foo</div>);
exports.default = Foo;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("/foo");
const a = <foo_1.default />;
