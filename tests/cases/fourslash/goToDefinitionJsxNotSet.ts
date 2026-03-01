/// <reference path='fourslash.ts' />

// Regresion tests for GH#46854

// @allowJs: true

// @Filename: /foo.jsx
//// const /*def*/Foo = () => (
////     <div>foo</div>
//// );
//// export default Foo;

// @Filename: /bar.jsx
//// import Foo from './foo';
//// const a = <[|/*use*/Foo|] />

verify.baselineGoToDefinition("use");