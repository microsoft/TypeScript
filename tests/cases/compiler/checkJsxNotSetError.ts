// @allowJs: true 
// @checkJs: true

// @Filename: /foo.jsx
const Foo = () => (
    <div>foo</div>
);
export default Foo;

// @Filename: /bar.jsx
import Foo from '/foo';
const a = <Foo />