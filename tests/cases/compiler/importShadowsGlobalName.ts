//@module: amd

// @Filename:Foo.ts
class Foo {}
export = Foo;

// @Filename: Bar.ts
import Error = require('Foo');
class Bar extends Error {}
export = Bar;