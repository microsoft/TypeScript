//// [tests/cases/compiler/declarationEmitTripleSlashReferenceAmbientModule.ts] ////

//// [index.d.ts]
declare module "url" {
  export class Url {}
  export function parse(): Url; 
}

//// [usage1.ts]
export { parse } from "url";

//// [usage2.ts]
import { parse } from "url";
export const thing: import("url").Url = parse(); 

//// [usage3.ts]
import { parse } from "url";
export const thing = parse();




//// [usage1.d.ts]
/// <reference types="node" />
export { parse } from "url";
//// [usage2.d.ts]
/// <reference types="node" />
export declare const thing: import("url").Url;
//// [usage3.d.ts]
/// <reference types="node" />
export declare const thing: import("url").Url;
