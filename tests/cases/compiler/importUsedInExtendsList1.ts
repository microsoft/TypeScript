// @module: commonjs
// @Filename: importUsedInExtendsList1_require.ts
export class Super { foo: string; }

// @Filename: importUsedInExtendsList1_1.ts
///<reference path='importUsedInExtendsList1_require.ts'/>
import foo = require('./importUsedInExtendsList1_require');
class Sub extends foo.Super { }
var s: Sub;
var r: string = s.foo;
