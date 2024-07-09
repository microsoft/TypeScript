//// [tests/cases/compiler/nodeNextEsmImportsOfPackagesWithExtensionlessMains.ts] ////

//// [package.json]
{
    "name": "@types/ip",
    "version": "1.1.0",
    "main": "",
    "types": "index"
}
//// [index.d.ts]
export function address(): string;
//// [package.json]
{
    "name": "nullthrows",
    "version": "1.1.1",
    "main": "nullthrows.js",
    "types": "nullthrows.d.ts"
}
//// [nullthrows.d.ts]
declare function nullthrows(x: any): any;
declare namespace nullthrows {
    export {nullthrows as default};
}
export = nullthrows;
//// [package.json]
{
    "type": "module"
}
//// [index.ts]
import * as ip from 'ip';
import nullthrows from 'nullthrows'; // shouldn't be callable, `nullthrows` is a cjs package, so the `default` is the module itself

export function getAddress(): string {
  return nullthrows(ip.address());
}

//// [index.js]
import * as ip from 'ip';
import nullthrows from 'nullthrows'; // shouldn't be callable, `nullthrows` is a cjs package, so the `default` is the module itself
export function getAddress() {
    return nullthrows(ip.address());
}
