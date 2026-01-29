//// [tests/cases/compiler/referenceTypesPreferedToPathIfPossible.ts] ////

//// [index.d.ts]
declare module "url" {
    export class Url {}
    export function parse(): Url; 
}
//// [usage.ts]
import { parse } from "url";
export const thing = () => parse();


//// [usage.js]
import { parse } from "url";
export const thing = () => parse();


//// [usage.d.ts]
export declare const thing: () => import("url").Url;
