// @module: commonjs
// @declaration: true

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

// @filename: main.ts
/// <reference path="O.d.ts" />

import {Observable} from "Observable";
let x: Observable;
x.foo().x;
