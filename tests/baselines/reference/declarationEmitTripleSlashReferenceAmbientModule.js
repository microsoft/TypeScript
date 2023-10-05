//// [tests/cases/compiler/declarationEmitTripleSlashReferenceAmbientModule.ts] ////

//// [index.d.ts]
declare module "url" {
  export class Url {}
  export function parse(): Url; 
}
//// [usage1.ts]
import { parse } from "url";
export const thing: import("url").Url = parse(); 

//// [usage2.ts]
import { parse } from "url";
export const thing = parse();  // If type is inferred a /// directive is added



//// [usage1.d.ts]
export declare const thing: import("url").Url;
//// [usage2.d.ts]
/// <reference types="node" />
export declare const thing: import("url").Url;
