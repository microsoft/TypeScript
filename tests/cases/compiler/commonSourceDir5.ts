// @outFile: concat.js
// @module: esnext
// @moduleResolution: bundler
// @Filename: A:/bar.ts
import {z} from "./foo";
export var x = z + z;

// @Filename: A:/foo.ts
import {pi} from "B:/baz";
export var i = Math.sqrt(-1);
export var z = pi * pi;

// @Filename: B:/baz.ts
import {x} from "A:/bar";
import {i} from "A:/foo";
export var pi = Math.PI;
export var y = x * i;