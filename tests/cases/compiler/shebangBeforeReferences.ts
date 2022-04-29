// @module: commonjs

// @filename: f.d.ts
declare module "test" {
    let x: number;
}

// @filename: f.ts
#!/usr/bin/env node

/// <reference path="f.d.ts"/>

declare function use(f: number): void;
import {x} from "test";
use(x);