// @declaration: true
// @emitDeclarationOnly: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/@types/node/index.d.ts
declare module "url" {
  export class Url {}
  export function parse(): Url; 
}

// @Filename: /usage1.ts
export { parse } from "url";

// @Filename: /usage2.ts
import { parse } from "url";
export const thing: import("url").Url = parse(); 

// @Filename: /usage3.ts
import { parse } from "url";
export const thing = parse();
