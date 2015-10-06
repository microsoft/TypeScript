// @module: amd

// @filename: external.d.ts
export default class C {}

// @filename: main.ts

declare module "M" {
    import C from "external"
}