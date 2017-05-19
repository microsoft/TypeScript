// @module: amd

// @filename: external.d.ts
export var x: number

// @filename: main.ts

declare module "M" {
    export {x} from "external"
}