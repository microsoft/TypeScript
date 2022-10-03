// @module: commonjs
// @declaration: true;
// @filename: O.d.ts

declare module "Observable" {
    class Observable {}
}

declare module "M" {
    class Cls { x: number }
}

declare module "Map" {
    import { Cls } from "M";
    module "Observable" {
        interface Observable {
            foo(): Cls;
        }
    }
}

declare module "Map" {
    class Cls2 { x2: number }
    module "Observable" {
        interface Observable {
            foo2(): Cls2;
        }
    }
}

// @filename: main.ts
/// <reference path="O.d.ts" />

import {Observable} from "Observable";
import "Map";
let x: Observable;
x.foo().x;
x.foo2().x2;
