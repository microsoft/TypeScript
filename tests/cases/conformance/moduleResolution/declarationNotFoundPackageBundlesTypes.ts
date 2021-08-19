// @noImplicitAny: true
// @noImplicitReferences: true

// @filename: node_modules/foo/package.json
{   
    "name": "foo",
    "version": "1.0.0"
}

// @filename: node_modules/foo/index.js
var foo = 0;
module.exports = foo;

// @filename: node_modules/foo/index.d.ts
declare const foo: any;
export = foo;

// @filename: node_modules/foo/other.js
module.exports = {};

// @filename: index.ts
import * as Foo from "foo";
import * as Other from "foo/other"/*1*/;