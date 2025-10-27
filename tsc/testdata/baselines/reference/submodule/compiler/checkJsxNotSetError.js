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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = __importDefault(require("/foo"));
const a = <foo_1.default />;
