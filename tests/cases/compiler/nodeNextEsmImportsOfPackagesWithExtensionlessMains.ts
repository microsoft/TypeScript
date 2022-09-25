// @noImplicitReferences: true
// @module: nodenext
// @outDir: esm
// @filename: node_modules/@types/ip/package.json
{
    "name": "@types/ip",
    "version": "1.1.0",
    "main": "",
    "types": "index"
}
// @filename: node_modules/@types/ip/index.d.ts
export function address(): string;
// @filename: node_modules/nullthrows/package.json
{
    "name": "nullthrows",
    "version": "1.1.1",
    "main": "nullthrows.js",
    "types": "nullthrows.d.ts"
}
// @filename: node_modules/nullthrows/nullthrows.d.ts
declare function nullthrows(x: any): any;
declare namespace nullthrows {
    export {nullthrows as default};
}
export = nullthrows;
// @filename: package.json
{
    "type": "module"
}
// @filename: index.ts
import * as ip from 'ip';
import nullthrows from 'nullthrows'; // shouldn't be callable, `nullthrows` is a cjs package, so the `default` is the module itself

export function getAddress(): string {
  return nullthrows(ip.address());
}