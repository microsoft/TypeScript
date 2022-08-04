// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /node_modules/@types/node/index.d.ts
declare module "fs" {
  export interface WriteFileOptions {}
  export function writeFile(path: string, data: any, options: WriteFileOptions, callback: (err: Error) => void): void;
}

// @Filename: /index.js
import { writeFile, WriteFileOptions, WriteFileOptions as OtherName } from "fs";

/** @typedef {{ x: any }} JSDocType */

export { JSDocType };
export { JSDocType as ThisIsFine };
export { WriteFileOptions };
