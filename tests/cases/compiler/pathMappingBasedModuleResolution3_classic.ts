// @moduleResolution: classic
// @module: amd
// @baseUrl: c:/root
// @ignoreDeprecations: 6.0
// @traceResolution: true

// baseUrl set via command line

// @filename: c:/root/folder1/file1.ts
import {x} from "folder2/file2"
declare function use(a: any): void;
use(x.toExponential());

// @filename: c:/root/folder2/file2.ts
import {x as a} from "./file3"  // found with baseurl
import {y as b} from "file4"    // found with fallback
export var x = a + b;

// @filename: c:/root/folder2/file3.ts
export var x = 1;

// @filename: c:/file4.ts
export var y = 100;