// @module: nodenext
// @noEmit: true
// @noImplicitReferences: true
// @currentDirectory: /

// @filename: /node_modules/@types/runtime/index.d.ts
declare module "engine" {
    export const value: number;
    export default function read(): void;
}

// @filename: /main.mts
import { value } from "engine";
export { default as engine } from "engine";
