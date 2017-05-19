// @module: amd

// @filename: external.d.ts
export var x: number

// @filename: main.ts

declare module "M" {
    import {x} from "external"
}