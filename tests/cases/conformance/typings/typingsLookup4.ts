// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// A file extension is optional in typings entries.

// @filename: /tsconfig.json
{}

// @filename: /node_modules/@types/jquery/package.json
{ "typings": "jquery.d.ts" }

// @filename: /node_modules/@types/jquery/jquery.d.ts
export const j: number;

// @filename: /node_modules/@types/kquery/package.json
{ "typings": "kquery" }

// @filename: /node_modules/@types/kquery/kquery.d.ts
export const k: number;

// @filename: /node_modules/@types/lquery/package.json
{ "typings": "lquery" }

// @filename: /node_modules/@types/lquery/lquery.ts
export const l = 2;

// @filename: /a.ts
import { j } from "jquery";
import { k } from "kquery";
import { l } from "lquery";
j + k + l;
