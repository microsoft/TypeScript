// @target: esnext
// @module: esnext

// @filename: key.ts
export const key = "member";

// @filename: main.ts
import { key } from "./key";

export enum Example {
    [key] = 0,
}