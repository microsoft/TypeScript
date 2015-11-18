// @module: commonjs

// @filename: es6ImportNamedImportMergeErrors_0.ts
export var a = 10;
export var x = a;
export var z = a;
export var z1 = a;

// @filename: es6ImportNamedImportMergeErrors_1.ts
import { a } from "./es6ImportNamedImportMergeErrors_0";
interface a { } // shouldnt be error
import { x as x1 } from "./es6ImportNamedImportMergeErrors_0";
interface x1 { } // shouldnt be error
import { x } from "./es6ImportNamedImportMergeErrors_0"; // should be error
var x = 10; 
import { x as x44 } from "./es6ImportNamedImportMergeErrors_0"; // should be error
var x44 = 10; 
import { z } from "./es6ImportNamedImportMergeErrors_0"; // should be error
import { z1 as z } from "./es6ImportNamedImportMergeErrors_0"; // should be error
