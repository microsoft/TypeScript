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
const Foo = () => (<div>foo</div>);
export default Foo;
//// [bar.js]
import Foo from '/foo';
const a = <Foo />;
