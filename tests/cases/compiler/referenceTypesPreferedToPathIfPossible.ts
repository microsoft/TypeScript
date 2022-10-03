// @declaration: true
// @noImplicitReferences: true
// @filename: /.src/node_modules/@types/node/index.d.ts
declare module "url" {
    export class Url {}
    export function parse(): Url; 
}
// @filename: usage.ts
import { parse } from "url";
export const thing = () => parse();
