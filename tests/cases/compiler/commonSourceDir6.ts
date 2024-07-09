// @outFile: concat.js
// @outDir: a
// @module: amd
// @Filename: a/bar.ts
import {z} from "./foo";
export var x = z + z;

// @Filename: a/foo.ts
import {pi} from "../baz";
export var i = Math.sqrt(-1);
export var z = pi * pi;

// @Filename: baz.ts
import {x} from "a/bar";
import {i} from "a/foo";
export var pi = Math.PI;
export var y = x * i;